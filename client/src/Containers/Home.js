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
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  InputGroupAddon,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap'
import moment from 'moment'

import Fetch from '../Fetch'
import { LoaderContext } from '../LoaderContextManagement'

async function getUserInfo (loader) {
  const data = await Fetch('http://localhost:5000/v1/twitter/userInfo', loader, { method: 'GET' })
  return data
}

function logout (history, loader) {
  loader.setLoader(true)
  window.localStorage.clear()
  loader.setLoader(false)
  history.replace('/')
}

async function getTweets (loader) {
  const data = await Fetch('http://localhost:5000/v1/twitter/getTweets', loader, {
    method: 'GET'
  })
  return data
}

async function postReplies (query, loader, setReply, setReplyTweet) {
  const data = await Fetch('http://localhost:5000/v1/twitter/postReplies', loader, {
    body: JSON.stringify({
      inReplyToStatusId: query.activeTweet.id_str,
      status: query.reply
    })
  })
  setReply('@' + query.activeTweet.user.screen_name + ' ')
  const replyTweets = { ...query.replyTweets }

  if (!replyTweets[query.activeTweet.id]) { replyTweets[query.activeTweet.id] = []}
  replyTweets[query.activeTweet.id].push(data)

  setReplyTweet(replyTweets)
}

function HomePage (props) {
  const [name, setName] = useState('')
  const [reply, setReply] = useState('')
  const [replyTweets, setReplyTweet] = useState({})
  const [tweets, setTweets] = useState([])
  const [activeTweet, setActiveTweet] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const loader = useContext(LoaderContext)

  const onKeyDown = function onKeyDown (event) {
    if (event.keyCode === 13) {
      postReplies({ reply, activeTweet, replyTweets }, loader, setReply, setReplyTweet)
    }
  }

  useEffect(() => {
    const userinfoApi = async () => {
      const userinfo = await getUserInfo(loader)
      if (userinfo && userinfo.name) {
        setName(userinfo.name)
      }
    }
    userinfoApi()
  }, [])

  useEffect(() => {
    const tweetsApi = async () => {
      const tweets = await getTweets(loader)
      setTweets(tweets)
    }
    tweetsApi()
  }, [])
  return (
    <div>
      <Navbar color='dark' dark expand='md' fixed>
        <NavbarBrand href='/'>Rich Panel</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <NavbarText style={{ color: 'white', width: '100%', textAlign: 'center' }}>Welcome! {name} </NavbarText>
        <Collapse isOpen={isOpen} navbar>
          <NavLink onClick={() => logout(props.history, loader)} style={{ color: 'white' }}>Logout</NavLink>
        </Collapse>
      </Navbar>
      <Container fluid style={{ margin: 0 }}>
        <Row xs='12' sm='12' md='12' style={{ height: '80vh' }}>
          <Col xs='4' sm='3' style={{ height: '80vh', overflow: 'scroll', padding: 0, backgroundColor: 'white' }}>
            <ListGroup style={{ display: 'flex', flex: 1, backgroundColor: 'transparent' }}>
              {!tweets || tweets.length === 0 && <span>No mentioned tweets found</span>}
              {tweets && tweets.length > 0 && tweets.map(o => (
                <ListGroupItem style={{ width: '100%', border: 'none', display:'flex' }} active={activeTweet && o.id === activeTweet.id} onClick={() => { setReply('@' + o.user.screen_name + ' '); setActiveTweet(o) }}>
                  <div style={{width: '3.10em', height:'3.10em'}}><img src={o.user.profile_image_url} style={{    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius:'3em'}}/></div> 
    <div style={{    paddingLeft: '0.4em'}}>
                  <b style={{ fontSize: '1em' }}>
                  {o.user.name} <span style={{ fontWeight:'normal',fontSize: '0.8em' }}>
                      {/* {o.text} */}
                      {moment(o.created_at).fromNow()}
                    </span>
                  </b>
                  <p>
                    <span style={{ fontSize: '0.8em' }}>
                      {o.text}
                      {/* {moment(o.created_at).fromNow()} */}
                    </span>
                  </p>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col xs='8' sm='9' style={{ backgroundColor: '#EAF9F2' }}>
            <Row style={{ height: '80vh', overflow: 'scroll' }} className='h-95 '>
              <ListGroup style={{ display: 'flex', flex: 1 }}>
                {activeTweet &&
                  <ListGroupItem style={{ margin: '1%', width: '60%' }}>
                  <p style={{ fontSize: '1em' }}>
                    {activeTweet.text}
                  </p>
                  <p style={{ fontSize: '0.8em' }}>
                    {moment(activeTweet.created_at).fromNow()}
                  </p>
                </ListGroupItem>}
                {replyTweets && activeTweet && replyTweets[activeTweet.id] && replyTweets[activeTweet.id].map(o => <ListGroupItem
                  style={{
                    margin: '1%',
                    width: '60%',
                    marginLeft: '39%',
                    textAlign: 'right'
                  }}
                                                                                                                   >
                  <p style={{ fontSize: '1em' }}>
                    {o.text}
                  </p>
                  <p style={{ fontSize: '0.8em' }}>
                    {moment(o.created_at).fromNow()}
                  </p>
                                                                                                                   </ListGroupItem>
                )}

              </ListGroup>
            </Row>
            <Row>

              <InputGroup>
                <Input onKeyDown={onKeyDown} value={reply} onChange={o => setReply(o.target.value)} />
                <InputGroupAddon addonType='prepend' onClick={() => postReplies({ reply, activeTweet, replyTweets }, loader, setReply, setReplyTweet)}>
                  <Button>Send</Button>
                </InputGroupAddon>
              </InputGroup>
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(HomePage)
