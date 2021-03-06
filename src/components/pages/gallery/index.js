import { useEffect, useState } from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import Loading from 'components/common/Loading'
import { useError } from 'components/common/Error'
import { getArchive } from 'utils/apiService'

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
    margin: '2% 0 2% 2%',
    fontFamily: 'Prompt',
    fontSize: '2rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '5% 5% 5% 5%',
      fontSize: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.15rem',
    },
  },
  expandButton: {
    border: 'none',
    height: '10vh',
    marginRight: '30px',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '10px',
    },
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
    margin: '1% 1% 1% 1%',
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
  const [data, setData] = useState(null)
  const setError = useError()
  const archiveID = props.match.params.id
  useEffect(() => {
    async function getData() {
      try {
        const res = await getArchive(archiveID)
        setData(res)
      } catch (err) {
        setError(err)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!data) return <Loading />
  return (
    <div className={styles.page}>
      <Typography className={styles.header}>Quipmare Gallery</Typography>
      <div className={styles.body}>
        {data.map(({ question, a, b }, index) => {
          return (
            <div className={styles.container}>
              <div className={styles.question}>
                <Typography
                  className={styles.questionText}
                  style={{ wordWrap: 'break-word' }}
                >
                  {question}
                </Typography>
                <button
                  className={styles.expandButton}
                  onClick={() => {
                    setHide((prev) => ({ ...prev, [index]: !prev[index] }))
                  }}
                  color="default"
                  style={{ cursor: 'pointer' }}
                >
                  {hide[index] ? (
                    <ExpandMore fontSize="large" />
                  ) : (
                    <ExpandLess fontSize="large" />
                  )}
                </button>
              </div>
              {!hide[index] && (
                <div className={styles.answers}>
                  <div className={styles.answer}>
                    <Typography
                      className={styles.answerText}
                      style={{ wordWrap: 'break-word' }}
                    >
                      {a ? a : 'NO ANSWER'}
                    </Typography>
                  </div>
                  <div className={styles.answer}>
                    <Typography
                      className={styles.answerText}
                      style={{ wordWrap: 'break-word' }}
                    >
                      {b ? b : 'NO ANSWER'}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Gallery
