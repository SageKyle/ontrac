import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PushNotification from '../utils/PushNotification'

export default async function sendNotification(task, tag, dueDate) {
	const notice = `Remember: '${task}' is due ${formatDistanceToNow(
		new Date(dueDate),
		{
			addSuffix: true,
		}
	)}`
	const tag = 'task'
	await PushNotification(notice, tag, dueDate)
}
