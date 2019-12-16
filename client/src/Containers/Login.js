import React, { useState, useEffect, useContext } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Button
} from 'reactstrap'

import TwitterLogin from 'react-twitter-auth'
import { LoaderContext } from '../LoaderContextManagement'
import Fetch from '../Fetch'

// async function twitterVerify (){
//   const data =  await fetch('https://salty-plains-79519.herokuapp.com/v1/auth/twitter', {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//    });
//    const jsonParsed = await data.json();
//    console.log('json', jsonParsed,jsonParsed.oauth_token);
//    window.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token='+jsonParsed.oauth_token;
//  }

async function verifyTwitter (query, props, loader) {
  const data = await Fetch('https://salty-plains-79519.herokuapp.com/v1/auth/twitter', loader,
    {
      body: JSON.stringify({ ...query })
    }, {}, false)

  if (!data.headers.get('x-auth-token')) {
    window.alert('Please try again later')
    return
  }
  window.localStorage.setItem('atkn', data.headers.get('x-auth-token'))
  // Wating for localStorage to set
  setTimeout(() => {
    props.history.push('/home')
  }, 1000)
}

async function twitterInit (loader) {
  const data = await Fetch('https://salty-plains-79519.herokuapp.com/v1/auth/twitter/reverse', loader)
  if (data && data.oauth_token) {
    window.location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=' + data.oauth_token
  } else {
    window.alert('Please try again later')
  }
}

function Login (props) {
  const [activeTab, setActiveTab] = useState('1')
  const loader = useContext(LoaderContext)

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  useEffect(() => {
    var search = window.location.search.substring(1)
    if (search) {
      const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      if (query && Object.keys(query).length > 0) {
        verifyTwitter(query, props, loader)
      }
    }
  }, [])

  return (
    <Container className='themed-container' fluid style={{ paddingTop: '13em' }}>

      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }} style={{ padding: '1em', textAlign: 'center' }}>
          <b>Welcome to Rich Panel Twitter HelpDesk</b>
        </Col>
      </Row>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }} style={{ verticalAlign: 'center' }}>
          <Card style={{ height: '1em', border: 'none', backgroundColor: 'transparent' }}>
            <CardBody
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button color='info' onClick={() => twitterInit(loader)}>Login with Twitter</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default withRouter(Login)
