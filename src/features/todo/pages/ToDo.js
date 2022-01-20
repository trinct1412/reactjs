import { Box, Button, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { selectTodo, TodoAction } from '../todoSlice';
import { useDispatch,useSelector } from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    box: {
        padding: theme.spacing(2)
    }
})
)

export default function ToDo(){
    const classes = useStyles()
    const [toDoInputText, setToDoInputText] = React.useState('')
    const { todos } = useSelector(selectTodo)
    const dispatch = useDispatch()

    React.useEffect(() => {
      dispatch(TodoAction.fetchToDo())
    },[dispatch])
    

    const onHandleAddClick = () => {
        const id = todos.reduce((maxId, item) => Math.max(maxId, item.id), 0);
        dispatch(TodoAction.addToDo({ 
            id: id + 1,
            body: toDoInputText,
            postId: 1,      
        }))
        setToDoInputText('')
    }

    const onHandleDeleteClick = (id) =>{
        dispatch(TodoAction.deleteToDo({id}))
    }

    const onChangeInput = (todo) =>{ 
        setToDoInputText(todo)  
    }
    return (
        <div className={classes.root} >
            <Paper elevation={1} className={classes.box}>
                <Typography variant='h5' component='h1'>Todo List</Typography>
                <Box mt={4}>
                    <Input value={toDoInputText} 
                           onChange={e => onChangeInput(e.target.value)} 
                    />
                    <Button onClick={onHandleAddClick}>Add</Button>
                </Box>
                <List>
                {   todos.map(data => (
                    <ListItem key={data.id}>
                    <ListItemIcon>{data.id}</ListItemIcon>
                    <ListItemText>{data.body}</ListItemText>
                    <RoomIcon key={data.id} onClick={() => onHandleDeleteClick(data.id)}/>
                    </ListItem>
                )
                )}
            </List>
            </Paper>
         
        </div>
    )
}
