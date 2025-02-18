export default (url, options = {}) => {
    return $fetch(url, {
      ...options,
     
    })
  }