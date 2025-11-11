function OptionsIcon({width = 20, height = 20}) {
   return (
      <svg
         width={width}
         height={height}
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <circle cx="2" cy="10" r="2" fill="#888888"/>
         <circle cx="10" cy="10" r="2" fill="#888888"/>
         <circle cx="18" cy="10" r="2" fill="#888888"/>
      </svg>
   );
}

export default OptionsIcon;