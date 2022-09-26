import { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext';
import {Container, MainContainer} from './styles'
import { useTransition, animated } from 'react-spring'
    
const Message = () => {

    // const [show, setShow] = useState(true)

    const {setShowMessage, showMessage, message} = useContext(UserContext)
      // Transition
      const transition = useTransition(showMessage, {
        from: {x: 0, y: 100, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: 100, opacity: 0}

    })

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowMessage(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!showMessage) {
    return null;
  }




  // If show is true this will be returned
  return (
    <MainContainer>
        {transition((style, item) => 
            item ? 
            <animated.div style={style}>
                <Container >
                    <h1>{message}</h1>
                    <button onClick={()=> setShowMessage(false)}>x</button>
                </Container>
            </animated.div>
            : ''
        )}
    </MainContainer>
  )
}


export default Message;