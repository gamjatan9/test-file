import React from "react";
import { TextField, Paper, Button, Grid,  } from "@material-ui/core";

class AddWine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: {title: "", co:"", type:""}  };
    this.add = props.add;
  }

  onInputTitle = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onInputCo = (e) => {
    const thisItem = this.state.item;
    thisItem.co = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onInputType = (e) => {
    const thisItem = this.state.item;
    thisItem.type = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  //제품 추가 버튼
  onButtonAdd = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "", co:"", type:"" } });
  };

  render() {

    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container> 
          <Grid xs={4} md={4} item >
              title  :   
          </Grid>
          <Grid xs={8} md={8} item style={{ paddingRight: 16 }}>
            <TextField 
              placeholder="Add Title here"
              fullWidth
              onChange={this.onInputTitle}
              value={this.state.item.title}
            />
          </Grid>
        </Grid>

        <Grid container> 
            <Grid xs={4} md={4} item >
                country of origin  :  
            </Grid>
            <Grid xs={8} md={8} item style={{ paddingRight: 16 }}>
              <TextField 
                placeholder="Add CO here"
                fullWidth
                onChange={this.onInputCo}
                value={this.state.item.co}
              />
            </Grid>
        </Grid>

        <Grid container> 
          <Grid xs={4} md={4} item>
              type  :  
          </Grid>
          <Grid xs={8} md={8} item style={{ paddingRight: 16 }}>
            <TextField 
              placeholder="Add Type here"
              fullWidth
              onChange={this.onInputType}
              value={this.state.item.type}    
            />
          </Grid>
        </Grid>

        <Grid container> 
          <Grid xs={4} md={4} item>
              userId  :  
          </Grid>
          <Grid xs={8} md={8} item style={{ paddingRight: 16 }}>
            <TextField
              fullWidth
              onChange={"SooHyunKim"}
              value={"SooHyunKim"}
            />
          </Grid>
        </Grid>
        <br></br>

        <Grid container>
          <Grid xs={5} md={5}></Grid> 
          <Grid xs={2} md={2} item>
              <Button
                fullWidth
                color="secondary" style = {{backgroundColor: "#E6E6FA"}}
                variant="outlined"
                onClick={this.onButtonAdd}
              >
                제품 추가
              </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddWine;