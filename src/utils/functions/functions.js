export const preventDefault = () => {
    const elements = document.getElementsByTagName('a');
    for(const element of elements){
      element.addEventListener('click', event => {
        event.preventDefault();
      })
    }
};