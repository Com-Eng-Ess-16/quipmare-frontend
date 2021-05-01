import { useState } from 'react'
import {
  Typography,
  Switch,
  Avatar,
  makeStyles,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(3),
    paddingBottom: '10%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '10%',
      paddingBottom: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '10%',
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Architects Daughter',
    textShadow: '2px 2px #00000020',
    fontSize: '2.5rem',
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.85rem',
      marginBottom: '3vh',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.35rem',
    },
  },
  body: {},
  container: {
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3vh',
    },
  },
  question: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    border: '3px solid ' + theme.palette.primary.main,
  },
  questionText: {
    margin: '3% 3% 3% 3%',
    fontFamily: 'Prompt',
    fontSize: '2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '5% 5% 5% 5%',
      fontSize: '1.75rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.35rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.15rem',
    },
  },
  switch: {
    marginRight: '5%',
  },
  answers: {},
  answer: {
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  answerText: {
    margin: '2.5% 2.5% 2.5% 2.5%',
    fontFamily: 'Prompt',
    fontSize: '1.6rem',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '4% 4% 4% 4%',
      fontSize: '1.2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  avatars: {
    display: 'flex',
    marginRight: '5%',
  },
  avatar: {
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',
    width: '50px',
    height: '50px',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingBottom: '10%',
  },
  leaveButton: {
    fontFamily: 'Architects Daughter',
    fontSize: '1.5rem',
    width: '20%',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
      border: '2px solid ' + theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      width: '45%',
    },
  },
}))

function Gallery(props) {
  const styles = useStyles()
  const [hide, setHide] = useState({ 0: true, 1: true, 2: true, 3: true })
  //const gameID = props.match.params.id
  return (
    //<Typography>{gameID}</Typography>
    <div className={styles.page}>
      <Typography className={styles.header}>Jester Gallery</Typography>
      <div className={styles.body}>
        {[
          {
            questionText:
              'On your wedding night, it would be horrible to find out that the person you married is ______',
            winner: {
              answer: 'no one no one no one no one :(',
              voters: [1, 2, 3],
            },
            loser: {
              answer: 'yourself',
              voters: [4, 5],
            },
          },
          {
            questionText: 'question2',
            winner: {
              answer: 'answer1',
              voters: [1, 2, 3],
            },
            loser: {
              answer: 'answer2',
              voters: [4, 5],
            },
          },
          {
            questionText: 'question3',
            winner: {
              answer: 'answer1',
              voters: [1, 2, 3],
            },
            loser: {
              answer: 'answer2',
              voters: [4, 5],
            },
          },
          {
            questionText: 'question4',
            winner: {
              answer: 'answer1',
              voters: [1, 2, 3],
            },
            loser: {
              answer: 'answer2',
              voters: [4, 5],
            },
          },
        ].map(({ questionText, winner, loser }, index) => {
          return (
            <div className={styles.container}>
              <div className={styles.question}>
                <Typography
                  className={styles.questionText}
                  style={{ wordWrap: 'break-word' }}
                >
                  {questionText}
                </Typography>
                <Switch
                  className={styles.switch}
                  onChange={() => {
                    setHide((prev) => ({ ...prev, [index]: !prev[index] }))
                  }}
                  color="default"
                ></Switch>
              </div>
              {!hide[index] && (
                <div className={styles.answers}>
                  <div className={styles.answer}>
                    <Typography
                      className={styles.answerText}
                      style={{ wordWrap: 'break-word' }}
                    >
                      {winner.answer}
                    </Typography>
                    <div className={styles.avatars}>
                      {winner.voters.map((voter) => (
                        <Avatar className={styles.avatar}>{voter}</Avatar>
                      ))}
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <Typography
                      className={styles.answerText}
                      style={{ wordWrap: 'break-word' }}
                    >
                      {loser.answer}
                    </Typography>
                    <div className={styles.avatars}>
                      {loser.voters.map((voter) => (
                        <Avatar className={styles.avatar}>{voter}</Avatar>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <div className={styles.buttonContainer}>
          <Button className={styles.leaveButton} variant="contained">
            LEAVE
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Gallery
