import React from 'react'

interface PageLoaderProps {
  visible: boolean
}

const PageLoader: React.FC<PageLoaderProps> = ({ visible }) => {
  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 12, 30, 0.92)',
        backdropFilter: 'blur(6px)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <img
        src="https://clintra.com/wp-content/uploads/2022/02/clintacloud.gif"
        alt="Loading..."
        style={{
          width: '180px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default PageLoader
