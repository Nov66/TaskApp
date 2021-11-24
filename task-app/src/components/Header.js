import Button from './Button';

const Header = ({ title, onAdd, showAddTask }) => {
  return (
    <header className='header'>
      {/* <h1 style={HeadingStyle}>{title}</h1> */}
      <h1>{title}</h1>
      <Button
        color={showAddTask ? 'red' : 'green'}
        text={showAddTask ? 'Close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

/* CSS in JS
const HeadingStyle = {
  color: 'red',
  backgroundColor: 'black',
};
*/
export default Header;
