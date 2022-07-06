import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
import GroupIcon from '@mui/icons-material/Group'
import { formatTime } from '../utils/formatters'
import { useDispatch, useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useCallback } from 'react'
import { api } from '../utils/api'

const Event = ({ event, emptyMessage, onDelete }) => {
  const dispatch = useDispatch()

  const userId = useSelector(state => state.auth.user?.id)

  const onEditClick = useCallback(
    () =>
      dispatch({
        type: 'modals/show',
        payload: {
          modal: 'eventDetailsInteraction',
          data: { type: 'edit', data: event }
        }
      }),
    [dispatch, event]
  )

  const onDeleteClick = useCallback(async () => {
    try {
      const response = await api('events', 'DELETE', { id: event.id })

      if (!response.success) {
        dispatch({
          type: 'modals/show',
          payload: {
            modal: 'toast',
            data: { type: 'error', message: response.messages }
          }
        })
      }

      dispatch({ type: 'events/remove', payload: event.id })

      onDelete()
    } catch {
      dispatch({
        type: 'modals/show',
        payload: {
          modal: 'toast',
          data: { type: 'error', message: 'Could not delete event' }
        }
      })
    }
  }, [dispatch, event, onDelete])

  return event !== undefined ? (
    <Paper sx={{ padding: 2 }} elevation={3}>
      <Typography variant="h5">{event.title}</Typography>

      <Stack direction="row" spacing={1}>
        {event.sharedData ? (
          <GroupIcon sx={{ mt: '3px' }} fontSize="small" />
        ) : null}
        <Typography variant="subheading">
          {formatTime(new Date(event.start)) +
            ' - ' +
            formatTime(new Date(event.end))}
        </Typography>
      </Stack>

      {event.description ? (
        <Box mt="15px" mb="15px">
          <Divider>Description</Divider>
          <Typography>{event.description}</Typography>
        </Box>
      ) : null}

      {event.sharedData ? (
        <Box mt="15px" mb="15px">
          <Divider>Shared with</Divider>
          <Typography variant="caption">Name</Typography>
          <Typography>{event.sharedData.name}</Typography>
          <Typography variant="caption">Email</Typography>
          <Typography>{event.sharedData.email}</Typography>
        </Box>
      ) : null}

      <Stack direction="row" justifyContent="flex-end" spacing={1} mt="30px">
        {userId === event.creatorId ? (
          <IconButton aria-label="edit" color="primary" onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        ) : null}

        <IconButton aria-label="delete" color="error" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50%"
    >
      <Stack alignItems="center">
        <HighlightAltIcon fontSize="large" />
        <Typography variant="h6">{emptyMessage}</Typography>
      </Stack>
    </Box>
  )
}

Event.propTypes = {
  event: PropTypes.object,
  emptyMessage: PropTypes.string,
  onDelete: PropTypes.func
}

export default Event
