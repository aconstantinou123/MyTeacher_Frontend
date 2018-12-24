import store from '../store/store'
import {
  PARTICIPANT_ADDED,
  PARTICIPANT_LEFT,
} from '../types/types'

export const attachTracks = (tracks, remoteContainer) => {
  tracks.forEach((track) => {
    remoteContainer.appendChild(track.attach())
  })
}

export const attachParticipantTracks = (participant, remoteContainer) => {
  const tracks = Array.from(participant.tracks.values())
  attachTracks(tracks, remoteContainer)
}

export const detachTracks = (tracks) => {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove()
    })
  })
}

export const detachParticipantTracks = (participant) => {
  const tracks = Array.from(participant.tracks.values())
  detachTracks(tracks)
}

export const roomJoined = (room, remoteContainer, localContainer) => {
  attachParticipantTracks(room.localParticipant, localContainer)
  room.participants.forEach((participant) => {
    console.log(`Already in Room: '${participant.identity}'`)
    attachParticipantTracks(participant, remoteContainer)
    if (!participant.identity.includes('TEACHER')) {
      store.dispatch({ type: PARTICIPANT_ADDED })
    }
  })
  room.on('participantConnected', (participant) => {
    console.log(`A remote Participant connected: ${participant}`)
    if (!participant.identity.includes('TEACHER')) {
      store.dispatch({ type: PARTICIPANT_ADDED })
    }
  })
  room.on('trackSubscribed', (track, participant) => {
    console.log(`${participant.identity} added track: ${track.kind}`)
    attachTracks([track], remoteContainer)
  })

  room.on('trackUnsubscribed', (track, participant) => {
    console.log(`${participant.identity} removed track: ${track.kind}`)
    detachTracks([track])
  })
  room.on('participantDisconnected', (participant) => {
    console.log(`Participant '${participant.identity}' left the room`)
    detachParticipantTracks(participant)
    if (!participant.identity.includes('TEACHER')) {
      store.dispatch({ type: PARTICIPANT_LEFT })
    }
  })

  room.on('disconnected', () => {
    console.log('disconnect')
    detachParticipantTracks(room.localParticipant)
    room.localParticipant.tracks.forEach(track => track.stop())
    room.participants.forEach(detachParticipantTracks)
  })
}
