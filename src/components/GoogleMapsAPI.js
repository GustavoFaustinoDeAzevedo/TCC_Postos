import React, { useEffect, useState, useCallback, memo, useRef } from 'react';
/*import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api';*/
import { connect, useSelector } from 'react-redux';
import {
  DislikeOutlined,
  HomeOutlined,
  LikeOutlined,
  SendOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Card, Drawer, Input, List, Popover, Rate, Spin } from 'antd';
import {
  ActiveLoadting,
  GetCoord,
  HideShowMapDrawer,
  PrecoCombustivel,
  ProcurarPosto,
  SetLocation,
  ShowMapDrawer,
} from '../actions/generalActions';
import {
  AttributionControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvent,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import './Maps.css';
import Tabela from './Tabela';
import Search from 'antd/lib/input/Search';
import Text from 'antd/lib/typography/Text';
/*function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB5e_duPiyEM9Sl7b5KwbT08BSsV-QdL7o',
  });
  const { latitude, longitude, mapHeight } = useSelector(
    (state) => state.general
  );
  const [map, setMap] = useState(null);
  const [visible, setVisible] = useState(null);
  const [localCoord, SetLocalCoord] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      SetLocalCoord([position.coords.latitude, position.coords.longitude]);
      props.dispatch(
        SetLocation([position.coords.latitude, position.coords.longitude])
      );
    });
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        setClickableIcons={false}
        mapContainerStyle={{ height: mapHeight }} //400px
        center={{
          lat: latitude,
          lng: longitude,
        }}
        zoom={19}
      >
        <div style={{ width: '100%', padding: '60px 0px 0px 10px' }}>
          <Button
            style={{ padding: '5px 50px 5px 50px' }}
            onClick={() => props.dispatch(SetLocation(localCoord))}
            type="primary"
          >
            Sua Posição
          </Button>
        </div>

        <Marker
          name="Sua Posição"
          position={{
            lat: localCoord[0],
            lng: localCoord[1],
          }}
        ></Marker>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}*/

function MyComponent(props) {
  const {
    latitude,
    longitude,
    mapHeight,
    mapDrawer,
    isAuthenticated,
    coord,
    loadingMap,
    tabelaPrecosPesquisa,
    tabelaPrecos,
  } = useSelector((state) => state.general);
  const [localCoord, setLocalCoord] = useState({ lat: 0, lng: 0 });

  //const [localCoord,SetLocalCoord] = useEffect(position);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocalCoord({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      props.dispatch(
        GetCoord(
          [position.coords.latitude, position.coords.longitude].toString()
        )
      );
    });
  }, []);
  const mapRef = useRef(null);
  const handleClick = () => {
    mapRef.current._popup._closeButton.addEventListener('click', (event) => {
      event.preventDefault();
    });
  };

  function ChangeMapView() {
    const map = useMap();
    map.setView(coord, map.getZoom(), { animate: 'false' });

    return null;
  }
  const map = (
    <Spin spinning={loadingMap}>
      <div
        style={{
          position: 'relative',
          minHeight: window.screen.width < 780 ? '60vh' : '80vh',
          width: '100%',
        }}
      >
        <Drawer
          title="Resultado"
          placement="top"
          height={window.screen.width < 780 ? '60vh' : '80vh'}
          getContainer={false}
          style={{
            position: 'absolute',
          }}
          onClose={() => {
            props.dispatch(ShowMapDrawer(false));
          }}
          visible={mapDrawer}
        >
          <Tabela />
        </Drawer>

        <MapContainer
          dragging={true}
          center={localCoord}
          zoom={15}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{
            minHeight: window.screen.width < 780 ? '69vh' : '86vh',
            width: '100%',
          }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!mapDrawer && (
            <>
              <div style={{ height: '100%', width: '100%' }}>
                <Button
                  tootip="Mostrar Seu Local"
                  icon={<SendOutlined />}
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setLocalCoord({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                      props.dispatch(
                        GetCoord(
                          [
                            position.coords.latitude,
                            position.coords.longitude,
                          ].toString()
                        )
                      );
                    });
                  }}
                  style={{
                    top: window.screen.width < 780 ? '67%' : '83%',
                    left: '10px',
                    position: 'absolute',
                    zIndex: '1000',
                  }}
                />
              </div>
              <ZoomControl
                position="bottomleft"
                zoomInText="+"
                zoomOutText="-"
              />
            </>
          )}
          <List
            dataSource={Object.values(tabelaPrecos)}
            renderItem={(data) => (
              <List.Item style={{ paddingTop: '35px' }}>
                <Marker
                  eventHandlers={{
                    click: (e) => handleClick(),
                  }}
                  position={
                    data.COORDENADAS.toString()
                      ? data.COORDENADAS.toString().split(',')
                      : [0, 0]
                  }
                >
                  <Popup>
                    <Text strong>{data.NOMEFANTASIA}</Text> <br />{' '}
                    {data.ENDERECO}
                    <br /> {data.BAIRRO}
                    <br />
                    {data.RANK}
                    <Rate
                      disabled={!isAuthenticated}
                      defaultValue={data.RANK}
                    />
                    ({data.NVOTOS})
                    <br />
                    <Card
                      style={{
                        backgroundColor: '#52c41a',
                        color: 'white',
                        borderRadius: '10px',
                        lineHeight: '100%',
                        fontSize: '0.75em',
                      }}
                    >
                      <div>
                        <div>
                          <span>
                            Diesel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {(6 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;&nbsp;
                            <Rate
                              disabled={!isAuthenticated}
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<LikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Rate
                              disabled={!isAuthenticated}
                              onChange={() => {
                                if (isAuthenticated) {
                                } else {
                                  alert(
                                    'Precisa autenticar para fazer esta ação!'
                                  );
                                }
                              }}
                              character={<DislikeOutlined />}
                              defaultValue={0}
                              count={1}
                            />
                          </span>
                        </div>
                        <br />
                        <div>
                          Etanol:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {(6 + Math.random()).toFixed(3)}
                          &nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<LikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<DislikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                        </div>
                        <br />
                        <div>
                          Gasolina:
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {(7 + Math.random()).toFixed(3)}
                          &nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<LikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<DislikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                        </div>
                        <br />
                        <div>
                          G. Aditivada: &nbsp;&nbsp;&nbsp;&nbsp;
                          {(7 + Math.random()).toFixed(3)}
                          &nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<LikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Rate
                            disabled={!isAuthenticated}
                            onChange={() => {
                              if (isAuthenticated) {
                              } else {
                                alert(
                                  'Precisa autenticar para fazer esta ação!'
                                );
                              }
                            }}
                            character={<DislikeOutlined />}
                            defaultValue={0}
                            count={1}
                          />
                        </div>
                      </div>
                    </Card>
                  </Popup>
                  <Tooltip direction="auto" offset={[-8, -2]} opacity={3}>
                    <span>{data.NOMEFANTASIA}</span>
                  </Tooltip>
                </Marker>
              </List.Item>
            )}
          />
          <ChangeMapView />
        </MapContainer>
      </div>
    </Spin>
  );
  return <div>{map}</div>;
}
export default connect()(MyComponent);
