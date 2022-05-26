import { Button } from 'antd';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';

function OnLogOut(props) {
  console.log(props);
  const { isAuthenticated, user } = useSelector((state) => state.general);

  const ClickButton = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      style={{
        overflow: 'auto',
        padding: '10% 15%',
        background: '#ececec',
        height: '65vh',
      }}
    >
      {isAuthenticated && (
        <div>
          Olá {user.nome} <br />
          Você está logado! <br></br>
          <Link to={'/login'}>
            {' '}
            <Button onClick={() => ClickButton()} type="primary">
              Deslogar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default connect()(OnLogOut);
