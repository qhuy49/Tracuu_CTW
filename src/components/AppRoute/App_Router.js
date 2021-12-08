import React, { Component } from "react";
import { Route ,Switch} from "react-router-dom";
import LookupInvoiceList from "../LookupEinvoice/LookupInvoiceList";
import SearchInvoiceBody from "../ChildSearchForm/SearchInvoiceBody";

class App_Router extends Component {
  render() {
      
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <SearchInvoiceBody
              type={this.props.type}
              userClick={this.props.userClick}
              Click={this.props.Click}
            />
          )}
        />
        <Route 
            path="/lookup_invoice" 
            component={LookupInvoiceList} />
      </Switch>
    );
  }
}

export default App_Router;
