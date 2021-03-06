import {ArrowForwardIcon, ChatIcon, CloseIcon} from '@chakra-ui/icons';
import {
  Box, Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Grid,
  GridItem, Avatar,
  Select
} from '@chakra-ui/react';
import 'emoji-mart/css/emoji-mart.css';
import _ from 'underscore';
import {nanoid} from 'nanoid';
import React, {useContext, useEffect, useState} from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import {ChatContext} from './ChatContext';
import './TownChat.css';
import EmojiInput from './EmojiInput';
import {ChatMessageProps} from "./types";

const Chat = () => {
  // static contextType = ChatContext;

  const {players, currentTownFriendlyName} = useCoveyAppState();

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  let msgIndex = 0;
  const {userName} = useCoveyAppState();
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  const [selectedValue, setselectedValue] = useState('all');

  const [messages, setMessages] = useState([
    {
      id: '1',
      message: `Hello ${userName}! Type a message and press Send Message to continue the chat.`,
      author: 'Covey Bot',
      to: 'all',
      time: '22:00',
    },
  ]);

  const myContext = useContext(ChatContext);
  const addEmoji = (e:any) => {
    const emoji = e.native;
    setInputMessage(inputMessage + emoji);
  };
  useEffect(() => {
    // this.context;
    // initiate socket connection

    // if(openChatScreen){
    //   setOpenChat(true);
    // }
    myContext.init();

    const observable = myContext.onMessage();

    observable.subscribe((m: ChatMessageProps) => {
      messages.push(m);
      setMessages(messages);
      setInputMessage('');
    });
  }, [messages]);

  const handleMessage = (messageObj: ChatMessageProps): void => {
    if (inputMessage !== '') {
      myContext.send(messageObj);
      setInputMessage('');
    }
    setMessages(oldArray => [...oldArray, messageObj]);
  };

  const onKeyPress = (event: any) => {
    if (event.charCode === 13) {
      handleMessage({
        id: nanoid(),
        message: inputMessage,
        author: userName,
        to: selectedValue,
        time,
      })
    }
  }

  const emojiInserted = (messageWithEmoji: string) => {
    setInputMessage(' $inputMessage $messageWithEmoji' );
  };


  return (
    <div>
      <Flex align='right' justify='right'>
        <Spacer/>
        <IconButton
          size='lg'
          colorScheme='twitter'
          aria-label='Chat Button'
          className='footer'
          icon={<ChatIcon/>}
          onClick={() => setOpenChat(true)}
        />
      </Flex>
      {openChat && <Flex className='Public-chat'>
          <div className="rcw-header">
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  <GridItem colSpan={3}>
                      <h4 className="rcw-title">
                          <Avatar
                              src='https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Chat-2-512.png'
                              className="avatar" alt="profile"/>
                        {currentTownFriendlyName} Chat Room
                      </h4>
                  </GridItem>
                  <GridItem colSpan={1}>
                      <Button className="rcw-close-button" onClick={() => setOpenChat(false)}>
                          <CloseIcon/>
                      </Button>
                  </GridItem>
              </Grid>
          </div>
          <div className='App-chatbox'>
            {
              _.uniq(messages, 'id')
                .filter((m) => m.to === userName || m.to === 'all' || m.author === userName)
                .map((msg: ChatMessageProps) => {
                  msgIndex += 1;
                  return (
                    <Box key={msg.id} overflow='auto' m='5'
                         className={msg.author === userName ? 'MyMessage' : 'Message'}>
                      <div
                        key={msgIndex}>
                        <p style={{float: 'right'}}>{msg.time}</p>
                        <p>
                          {msg.author} {msg.to === userName ? '(privately)' : ''}:
                        </p>
                        {/* <p>{msg.to}, {userName}</p> */}
                        <p>{msg.message}</p>
                      </div>
                    </Box>
                  );
                })}
          </div>
          <InputGroup>
              <Select
                  className='select-chat'
                  onChange={event => setselectedValue(event.target.value)}
                  variant='outline'>
                  <option value="" selected disabled hidden>Recipient</option>
                  <option className='select-chat' value='all'>Everyone</option>
                {players
                  .filter(p => p.userName !== userName)
                  .map(player => (
                    <option className='select-chat' key={player.id} value={player.userName}>
                      {player.userName}
                    </option>
                  ))}
              </Select>
              <Input
                  className='App-Textarea'
                  placeholder='Type your message...'
                  // onKeyPress={onKeyPress}
                  onChange={event => setInputMessage(event.target.value)}
                  value={inputMessage}
              />
               <span>
               <EmojiInput value={inputMessage} onSelection={emojiInserted} />
              </span>
              <InputRightElement>

                  <IconButton
                      colorScheme='twitter'
                      aria-label='Search database'
                      icon={<ArrowForwardIcon/>}
                      isDisabled={inputMessage === ''}
                      onClick={() =>
                        handleMessage({
                          id: nanoid(),
                          message: inputMessage,
                          author: userName,
                          to: selectedValue,
                          time,
                        })
                      }
                  />
              </InputRightElement>
          </InputGroup>
      </Flex>}
    </div>
  );
};

export default Chat;
