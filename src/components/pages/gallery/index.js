import { useState } from 'react'
import { Typography, Switch, Avatar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(3),
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Architects Daughter',
    textShadow: '2px 2px #00000020',
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },
  body: {},
  question: {
    marginTop: '5vh',
    height: '13vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    border: '3px solid ' + theme.palette.primary.main,
  },
  questionText: {
    marginLeft: '5%',
    fontSize: '2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  switch: {
    marginRight: '5%',
  },
  answers: {
    marginBottom: '5vh',
  },
  answer: {
    height: '10vh',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
  answerText: {
    marginLeft: '5%',
    fontSize: '1.4rem',
    width: '100%',
  },
  avatars: {
    display: 'flex',
    marginRight: '5%',
  },
  avatar: {
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',
  },
}))

function Gallery(props) {
  const styles = useStyles()
  const [hide, setHide] = useState({ 0: true, 1: true })
  //const gameID = props.match.params.id
  return (
    //<Typography>{gameID}</Typography>
    <div className={styles.page}>
      <Typography className={styles.header}>(Insert gallery name)</Typography>
      <div className={styles.body}>
        {[
          {
            questionText: 'question12321313123213123312312',
            winner: {
              answer: 'answer1ddddddddddddddddddddd',
              voters: [1, 2, 3],
            },
            loser: {
              answer: 'answer2',
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
        ].map(({ questionText, winner, loser }, index) => {
          return (
            <>
              <div className={styles.question}>
                <Typography className={styles.questionText}>
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
                    <Typography className={styles.answerText}>
                      {winner.answer}
                    </Typography>
                    <div className={styles.avatars}>
                      {winner.voters.map((voter) => (
                        <Avatar className={styles.avatar}>{voter}</Avatar>
                      ))}
                    </div>
                  </div>
                  <div className={styles.answer}>
                    <Typography className={styles.answerText}>
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
            </>
          )
        })}
      </div>
    </div>
  )
}
export default Gallery
