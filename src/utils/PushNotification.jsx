export default function PushNotification(notice, tag) {
	Notification.requestPermission()
		.then((perm) => {
			if (perm === 'granted') {
				const notification = new Notification('Reminder From OnTrac', {
					body: notice,
					tag: tag,
				})
				notification.addEventListener('click', () => {
					window.location.pathname = '/'
				})
			}
			if (perm === 'denied') {
				alert('OnTrac needs your permission to send you notifications')

				return Notification.requestPermission()
			}
		})
		.catch((err) => {
			alert('OnTrac needs your permission to send you notifications')
			return Notification.requestPermission()
		})
}

// TODO modify the notification function to only be called on a given date
