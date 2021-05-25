import React from 'react';
import { Nav} from 'react-bootstrap';

function NavComponent( {item1, item2, item3, item4}) {
    console.log(item1, item2, item3)
    return (
    <Nav>
        <Nav.Item>
          {item1?
          (<Nav.Link href="/profile">Sign In</Nav.Link>):(<Nav.Link disabled>Sign In</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
            {item2?
            (<Nav.Link href="/shipping">Shipping</Nav.Link>):(
                <Nav.Link disabled>Shipping</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
        {item3?
            (<Nav.Link href="/payment">Payment</Nav.Link>):(
                <Nav.Link disabled>Payment</Nav.Link>)}
        </Nav.Item>
        <Nav.Item>
        {item4?
          <Nav.Link href="/placeorder">Place Order</Nav.Link>
          :
          <Nav.Link disabled>Place Order</Nav.Link>
        }
        </Nav.Item>
      </Nav>
    )
}

export default NavComponent
