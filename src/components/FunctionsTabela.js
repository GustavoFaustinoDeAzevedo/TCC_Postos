import { Button } from "antd";
import { useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";

function getColumnSearchProps(dataIndex){
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex,
            });
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  const filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
  const onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => this.searchInput.select(), 100);
    }
  },
  render: text =>
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
}

export default connect()(OnLogOut);
















import { GoogleMap } from "@react-google-maps/api";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer, ArcLayer } from "deck.gl";

import "./styles.css";

//データ取得先
const AIR_PORTS = "./ne_10m_airports.geojson";

//google mapにオーバーレイするDeck.glレイヤー
const deckOverlay = new GoogleMapsOverlay({
  layers: [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      opacity: 1,
      pointRadiusScale: 2000,
      getRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],

      pickable: true,
      autoHighlight: true
    }),
    new ArcLayer({
      id: "arcs",
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});

function App() {
  return (
    <div className="App">
      <GoogleMap
        onLoad={map => {
          deckOverlay.setMap(map); //Google MapsにDeck.gl
        }}
        id="deckgl-example"
        mapContainerStyle={{
          height: window.innerHeight,
          width: window.innerWidth
        }}
        zoom={5}
        center={{
          lat: 51.47,
          lng: 0.45
        }}
      />
    </div>
  );
}