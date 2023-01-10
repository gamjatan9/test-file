import React from "react";
import "./App.css";
import { Container, InputBase, Tab, Box, Tabs,
  Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from "./service/ApiService";
import AddWine from "./AddWine"
import DeleteWine from "./DeleteWine"
import UpdateWine from "./UpdateWine"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      value: 0,
      search:null,
    };
  }
  componentDidMount() {
    call("/wine", "GET", null).then((response) => {
      this.setState({ items: response.data, loading: false });
    });
  };

  add = (item) => {
    call("/wine", "POST", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  delete = (item) => {
    call("/wine", "DELETE", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  update = (item) => {
    call("/wine", "PUT", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  searchSpace = (e) => {
    let keyword = e.target.value;
    this.setState({search:keyword})
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  }

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
    }
    this.update(this.state.item);
  };
  
  render() {
    // 업데이트된 제품 데이터를 테이블로 출력하는 WineTable
    var wineItems = (
      <Container maxWidth="md">
          <table border="1">
            <caption> Wine Item Table </caption>
            <thead><th>id</th><th>title</th><th>co</th><th>type</th><th>userId</th></thead>
            <tbody>
            {this.state.items.map((item, idx) => (
                <tr className="WineTable">
                  <td width="230"><InputBase type="text" value={item.id}></InputBase></td>
                  <td><InputBase type="text" value={item.title}></InputBase></td>
                  <td><InputBase type="text" value={item.co}></InputBase></td>
                  <td><InputBase type="text" value={item.type}></InputBase></td>
                  <td><InputBase type="text" value={"SooHyunKim"}></InputBase></td>
                </tr>))}
            </tbody>
          </table>
        </Container>
    );

    //제품 검색
    const searchWine = this.state.items.filter((item) => {
        if(this.state.search == null) return null;
        else if(item.title.includes(this.state.search)){ return item; }
      }).map(item => {
        return(
          <Container maxWidth="md">
            <table border="1" centered>
              <tbody>
                <tr>
                  <td width="150">title</td>
                  <td>
                    <input type="text" value={item.title}></input>
                  </td>
                </tr>
                <tr>
                  <td>co</td>
                  <td>
                    <input type="text" value={item.co}></input>
                  </td>
                </tr>
                <tr>
                  <td>type</td>
                  <td>
                    <input value={item.type}></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
        );})

    //제품 수정
    const updateWine = this.state.items.filter((item) => {
      if(this.state.search == null) return null;
      else if(item.title.includes(this.state.search)){ return item; }
    }).map(item => {
      return(
        <UpdateWine
          item={item}
          id={item.id} 
          name={item.id}
          value={item.title}
          add={this.add}
          update={this.update}
        />
      );})

    //제품 삭제
    const deleteWine = this.state.items.filter((item) => {
      if(this.state.search == null) return null;
      else if(item.title.includes(this.state.search)){ return item; }
    }).map(item => {
      return(
        <DeleteWine
          item={item}
          id={item.id} 
          name={item.id}
          value={item.title}
          delete={this.delete}
        />
      );})

    //TabMenu
    var TabMenu = (
      <div>
        <AppBar position="static" style={{ backgroundColor: '#6A5BA8' }}>
          <Tabs value={this.state.value} onChange={this.handleChange} centered>
            <Tab label="추가" {...this.a11yProps(0)} />
            <Tab label="검색" {...this.a11yProps(1)} />
            <Tab label="수정" {...this.a11yProps(2)} />
            <Tab label="삭제" {...this.a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <AddWine add={this.add} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <input size="40" style={{ height:"30px", textAlign:"center", fontSize:"15px"}} type="text" 
          placeholder="title로 제품검색" onChange={(e) => this.searchSpace(e)}/>
          <br></br><br></br>
            {searchWine}
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <input size="40" style={{ height:"30px", textAlign:"center", fontSize:"15px"}} type="text" 
            placeholder="title로 제품검색" onChange={(e) => this.searchSpace(e)} />
            <br></br> 
            {updateWine}
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <input size="40" style={{ height:"30px", textAlign:"center", fontSize:"15px"}} type="text" 
              placeholder="title로 제품검색" onChange={(e) => this.searchSpace(e)} />
          <br></br> 
          {deleteWine}
        </TabPanel>
      </div>
    );
            
    var navigationBar = ( //내비게이션 바 추가
      <AppBar position="static" style={{ backgroundColor: '#9370DB' }}>
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
            <Typography variant="h6">김수현의 와인 쇼핑몰</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
    );

    var wineListPage = (
      <div>
        {navigationBar}
        {TabMenu}
        {wineItems}
      </div>);

    var loadingPage=(<h1>로딩중...</h1>);

    var content = loadingPage;

    if( !this.state.loading) {
      content = wineListPage;
    }

    return (
      <div className="App">{content}</div>
    );
  }
}

class TabPanel extends React.Component {
  render() {
    return (
      <Typography component="div" hidden={this.props.value !== this.props.index}>
        <Box p={3}>{this.props.children}</Box>
      </Typography>
    );
  }
}

export default App;
