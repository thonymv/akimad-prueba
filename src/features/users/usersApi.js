const getUsers = async ()=> {
	let users = await fetch('https://api.github.com/users')
	return await users.json()
}

const searchUsers = async search=> {
	let users = await fetch('https://api.github.com/search/users?q='+search)
	return (await users.json()).items
}

const getUser = async id=> {
	let user = await ( await fetch('https://api.github.com/users/'+id) ).json()
	user.repo = await ( await fetch(user.repos_url) ).json()
	user.org = await ( await fetch(user.organizations_url) ).json()
	return user
}

export const usersAPI = { getUsers, searchUsers , getUser}
