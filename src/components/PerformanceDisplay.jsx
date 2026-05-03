import React, { useState, useEffect } from 'react'
import performanceMonitor from '../utils/performanceMonitor'

const PerformanceDisplay = ({ show = false }) => {
  const [metrics, setMetrics] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!show) return

    const updateMetrics = () => {
      setMetrics(performanceMonitor.getSummary())
    }

    const handleProgress = (event) => {
      setProgress(event.detail.progress)
      updateMetrics()
    }

    // Listen for progress updates
    window.addEventListener('lazyLoadingProgress', handleProgress)
    
    // Initial metrics
    updateMetrics()

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000)

    return () => {
      window.removeEventListener('lazyLoadingProgress', handleProgress)
      clearInterval(interval)
    }
  }, [show])

  if (!show || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-sm z-50 border border-gray-200">
      <div className="text-sm font-medium text-gray-700 mb-2">
        🚀 Lazy Loading Performance
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Metrics */}
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Progress:</span>
          <span className="font-medium">{progress.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Sections:</span>
          <span className="font-medium">{metrics.sectionsLoaded}/{metrics.totalSections}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg Load:</span>
          <span className="font-medium">{metrics.averageLoadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span>Total Time:</span>
          <span className="font-medium">{metrics.totalTime}ms</span>
        </div>
      </div>
      
      {/* Reset Button */}
      <button
        onClick={() => {
          performanceMonitor.reset()
          setProgress(0)
          setMetrics(null)
        }}
        className="mt-2 w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
      >
        Reset Metrics
      </button>
    </div>
  )
}

export default PerformanceDisplay 