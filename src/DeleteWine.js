import { TextField, Paper, Button, Grid,} from "@material-ui/core";
import React from "react"

class DeleteWine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: this.props.item };
    this.delete = props.delete;
  }

  onButtonDelete = () => {
    this.delete(this.state.item);
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
            onChange={this.onInputTitle}
            value={this.state.item.title}
            fullWidth
          />
          </Grid>
        </Grid>

        <Grid container> 
            <Grid xs={4} md={4} item >
                country of origin  :  
            </Grid>
            <Grid xs={8} md={8} item style={{ paddingRight: 16 }}>
              <TextField 
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
              onChange={this.state.item.userId}
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
                color="secondary"
                style = {{backgroundColor: "#E6E6FA"}}
                variant="outlined"
                onClick={this.onButtonDelete}
              >
                제품 삭제
              </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default DeleteWine;
