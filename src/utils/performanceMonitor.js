// Performance monitoring utility for lazy loading
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      sectionsLoaded: 0,
      totalSections: 0,
      loadTimes: [],
      startTime: performance.now()
    }
    
    this.observers = new Map()
  }

  // Track section loading
  trackSectionLoad(sectionName, loadTime) {
    this.metrics.sectionsLoaded++
    this.metrics.loadTimes.push({
      section: sectionName,
      loadTime: loadTime,
      timestamp: Date.now()
    })
    
    this.updateProgress()
  }

  // Track intersection observer performance
  trackIntersection(sectionName, entry) {
    const observer = this.observers.get(sectionName)
    if (observer) {
      observer.intersectionCount = (observer.intersectionCount || 0) + 1
      observer.lastIntersection = Date.now()
    }
  }

  // Register an observer for a section
  registerObserver(sectionName, observer) {
    this.observers.set(sectionName, {
      observer,
      intersectionCount: 0,
      lastIntersection: null
    })
  }

  // Update loading progress
  updateProgress() {
    const progress = (this.metrics.sectionsLoaded / this.metrics.totalSections) * 100
    
    // Dispatch custom event for potential UI updates
    window.dispatchEvent(new CustomEvent('lazyLoadingProgress', {
      detail: { progress, metrics: this.metrics }
    }))
  }

  // Get performance summary
  getSummary() {
    const totalTime = performance.now() - this.metrics.startTime
    const avgLoadTime = this.metrics.loadTimes.length > 0 
      ? this.metrics.loadTimes.reduce((sum, item) => sum + item.loadTime, 0) / this.metrics.loadTimes.length
      : 0

    return {
      totalTime: totalTime.toFixed(2),
      sectionsLoaded: this.metrics.sectionsLoaded,
      totalSections: this.metrics.totalSections,
      averageLoadTime: avgLoadTime.toFixed(2),
      loadTimes: this.metrics.loadTimes,
      observers: Array.from(this.observers.entries()).map(([name, data]) => ({
        name,
        intersectionCount: data.intersectionCount,
        lastIntersection: data.lastIntersection
      }))
    }
  }

  // Reset metrics
  reset() {
    this.metrics = {
      sectionsLoaded: 0,
      totalSections: 0,
      loadTimes: [],
      startTime: performance.now()
    }
    this.observers.clear()
  }

  // Set total sections count
  setTotalSections(count) {
    this.metrics.totalSections = count
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor()

// Export for use in components
export default performanceMonitor

// Export utility functions
export const trackSectionPerformance = (sectionName, callback) => {
  const startTime = performance.now()
  
  return () => {
    const loadTime = performance.now() - startTime
    performanceMonitor.trackSectionLoad(sectionName, loadTime)
    if (callback) callback()
  }
}

export const getPerformanceSummary = () => performanceMonitor.getSummary()
export const resetPerformanceMetrics = () => performanceMonitor.reset() 