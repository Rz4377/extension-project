chrome.storage.sync.get(['blockedKeywords'], function(data) {
    const blockedKeywords = data.blockedKeywords || [];
  
    function filterVideos() {
      const videos = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer');
      videos.forEach(video => {
        const title = video.querySelector('#video-title').innerText.toLowerCase();
        const channelName = video.querySelector('#channel-name').innerText.toLowerCase();
  
        blockedKeywords.forEach(keyword => {
          if (title.includes(keyword.toLowerCase()) || channelName.includes(keyword.toLowerCase())) {
            video.style.display = 'none';
          }
        });
      });
    }
  
    filterVideos();
    
    const observer = new MutationObserver(filterVideos);
    observer.observe(document.body, { childList: true, subtree: true });
  });
  