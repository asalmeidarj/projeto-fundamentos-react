export const preventDefaultTag = (nameTag) => {
    const elements = document.getElementsByTagName(nameTag);
    for(const element of elements){
      element.addEventListener('click', event => {
        event.preventDefault();
      })
    }
};