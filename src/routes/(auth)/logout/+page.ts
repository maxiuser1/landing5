import { auth } from '../../../firebase';
import type { PageLoad } from './$types';
import { signOut } from 'firebase/auth';

export const load: PageLoad = ({ data }) => {
	signOut(auth).then(() => {
		alert('test');
		document.location.href = '/';
	});
};
