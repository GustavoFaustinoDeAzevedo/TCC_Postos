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
import {
  Button,
  Card,
  Drawer,
  Input,
  List,
  Popover,
  Tooltip,
  Rate,
  Spin,
  Modal,
  InputNumber,
} from 'antd';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState(null);
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

  const d = new Date();
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
        <MapContainer
          dragging={true}
          center={localCoord}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={false}
          style={{
            minHeight: window.screen.width < 780 ? '69vh' : '86vh',
            width: '100%',
          }}
          ref={mapRef}
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
              props.dispatch(ActiveLoadting());
              props.dispatch(ShowMapDrawer(false));
            }}
            visible={mapDrawer}
          >
            <>
              <Tabela />
            </>
          </Drawer>
          <ChangeMapView />
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
            dataSource={tabelaPrecos}
            renderItem={(data) => (
              <List.Item style={{ paddingTop: '35px' }}>
                <Marker
                  eventHandlers={{
                    click: (e) => {
                      props.dispatch(GetCoord(data.COORDENADAS));
                      handleClick();
                    },
                  }}
                  position={
                    data.COORDENADAS
                      ? data.COORDENADAS.toString().split(',')
                      : [0, 0]
                  }
                >
                  <div>
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
                      <Text type="secondary">
                        {console.log(
                          ((d.getTime() - data.DATAATUALIZACAO) / 86400000) * 24
                        )}
                        Atualizado{' '}
                        {'há ' +
                          ((d.getTime() - data.DATAATUALIZACAO) / 3600000 < 24
                            ? (
                                (d.getTime() - data.DATAATUALIZACAO) /
                                3600000
                              ).toFixed(2) + ' horas'
                            : (
                                (d.getTime() - data.DATAATUALIZACAO) /
                                86400000
                              ).toFixed(0) +
                              ' dias e ' +
                              (
                                ((
                                  (d.getTime() - data.DATAATUALIZACAO) /
                                  86400000
                                ).toFixed(2) %
                                  1) *
                                24
                              ).toFixed(2) +
                              ' horas')}
                      </Text>
                      <Card
                        style={{
                          // backgroundColor: '#73d13d',
                          color: 'black',
                          borderRadius: '10px',
                          borderColor: 'lightgray',
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
                              <Button
                                type="ghost"
                                disabled={!isAuthenticated}
                                icon={<LikeOutlined />}
                              />
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <Button
                                type="ghost"
                                disabled={!isAuthenticated}
                                icon={<DislikeOutlined />}
                                onClick={() => setIsModalVisible(true)}
                              />
                            </span>
                          </div>
                          <br />
                          <div>
                            Etanol:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {(6 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              icon={<LikeOutlined />}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              icon={<DislikeOutlined />}
                              onClick={() => setIsModalVisible(true)}
                            />
                          </div>
                          <br />
                          <div>
                            Gasolina:
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {(7 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              icon={<LikeOutlined />}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              icon={<DislikeOutlined />}
                              onClick={() => setIsModalVisible(true)}
                            />
                          </div>
                          <br />
                          <div>
                            G. Aditivada: &nbsp;&nbsp;&nbsp;&nbsp;
                            {(7 + Math.random()).toFixed(3)}
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              autoFocus={true}
                              icon={<LikeOutlined />}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              type="ghost"
                              disabled={!isAuthenticated}
                              icon={<DislikeOutlined />}
                              onClick={() => setIsModalVisible(true)}
                            />
                          </div>
                        </div>
                      </Card>
                      <br />
                      {!isAuthenticated && (
                        <Text type="success">
                          Faça login para poder interagir
                        </Text>
                      )}
                    </Popup>
                  </div>
                </Marker>
              </List.Item>
            )}
          />
        </MapContainer>
        <Modal
          title="Por favor, insira o valor correto do preço"
          onCancel={() => setIsModalVisible(false)}
          visible={isModalVisible}
        >
          <InputNumber
            style={{
              width: 200,
            }}
            defaultValue={price}
            min="0"
            max="100"
            step="0.001"
            stringMode
          />
        </Modal>
      </div>
    </Spin>
  );
  return (
    <div>
      <div>{map}</div>
    </div>
  );
}
export default connect()(MyComponent);
