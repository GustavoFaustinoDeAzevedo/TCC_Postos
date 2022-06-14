import { Button } from 'antd';
import { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  LogOut,
  ProcurarPosto,
  ShowMapDrawer,
} from '../actions/generalActions';

function OnLogOut(props) {
  const { isAuthenticated, user } = useSelector((state) => state.general);
  useEffect(() => {
    props.dispatch(ShowMapDrawer(false));
  }, []);
  return (
    <div
      style={{
        overflow: 'auto',
        padding: '10% 15%',
        background: '#ececec',
        height: '86vh',
      }}
    >
      {isAuthenticated && (
        <div>
          Olá {user.nome} <br />
          Você está logado! <br></br> <br />
          <Link to="mapa">
            <Button key={'postos2'} type="primary">
              Ir para o mapa
            </Button>
          </Link>
          <br />
          <br />
          <Button
            onClick={() => {
              props.dispatch(LogOut());
              localStorage.clear();
            }}
            type="primary"
          >
            Deslogar
          </Button>
        </div>
      )}
    </div>
  );
}

export default connect()(OnLogOut);
