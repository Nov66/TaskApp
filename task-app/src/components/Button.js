const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        className='btn'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'steelBlue',
};

export default Button;
