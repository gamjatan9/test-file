import React from "react";
import "./App.css";
import { Container} from "@material-ui/core";

class SearchWine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      search:null, 
    };
  }

  searchSpace = (e) => {
    let keyword = e.target.value;
    this.setState({search:keyword})
  }


  render() {
    const wineItems = this.state.items.filter((item) => {
      if(this.state.search == null)
        return null;
      else if(item.title.toLowerCase().includes(this.state.search.toLowerCase())){
        return item;
      }
    }).map(item => {
      
      return(
        <div>
          <table border="1">
            <tbody>
              <tr>
                <td width="150">title</td>
                <td>
                  <input inputProps={{ "aria-label": "naked" }}
                    type="text"
                    value={item.title}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>co</td>
                <td>
                  <input
                      inputProps={{
                        "aria-label": "naked"
                      }}
                      type="text"
                      value={item.co}
                    ></input></td>
              </tr>
              <tr>
                <td>type</td>
                <td>
                  <input
                      inputProps={{
                        "aria-label": "naked"
                      }}
                      type="text"
                      value={item.type}
                    ></input></td>
              </tr>
            </tbody>
          </table>
        </div>
        
      );
    })

    return (
        <Container maxWidth="md">
          <div>
          
          <input width="150" height="50" type="text" placeholder="제품검색" onChange={(e) => this.searchSpace(e)}/>
              <div>{wineItems}</div>   
          </div>
        </Container>
    );
  }
}

export default SearchWine;
