const MainVideo = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube-nocookie.com/embed/5VxYrmnwQiA?controls=0&start=62&autoplay=1&mute=1&disablekb=1&modestbranding=0&showinfo=0&loop=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '-57px',
          left: '0',
          width: '100%',
          height: '100%',
          border: 'none',
          margin: '0', // 좌우 여백 제거
          padding: '0', //
          pointerEvents: 'none',
        }}
      ></iframe>
    </div>
  )
}

export default MainVideo
