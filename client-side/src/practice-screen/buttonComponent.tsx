

interface ButtonProps {
  isDarkTheme: boolean;
  title: string;
}

function Button({ isDarkTheme, title }: ButtonProps) {
  return (
    <div className={`${isDarkTheme ? "button-dark" : "button-light"}`} id="Main-Button">
      <div id="circle"></div>
      <a className={`${isDarkTheme ? "a-dark" : "a-light"}`} href="#">
        {title}
      </a>
    </div>
  );
}

export default Button;