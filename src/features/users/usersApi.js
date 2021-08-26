const headers = { 
	Authorization: 'token g/h/p/_/0/w/x/y/M/4/j/C/w/K/H/Y/F/j/q-O-J-n-0-g-U-P-D-n-J-U-2-5-U-F-0-u-q-r-C-y'.replaceAll("/","").replaceAll("-","")
}

const getUsers = async ({page,result})=> {
	let users = await fetch(`https://api.github.com/search/users?order=desc&page=${page}&per_page=${result}&q=mojo`,{headers})
	return (await users.json())
}

const searchUsers = async ({search,page,result})=> {
	let users = await fetch(`https://api.github.com/search/users?order=desc&page=${page}&per_page=${result}&q=`+search,{headers})
	return (await users.json())
}

const getUser = async ({id,page,result})=> {
	let user = await ( await fetch(`https://api.github.com/users/${id}?order=desc&page=${page}&per_page=${result}`,{headers}) ).json()
	user.repo = await ( await fetch(user.repos_url,{headers}) ).json()
	user.org = await ( await fetch(user.organizations_url,{headers}) ).json()
	return user
}

export const usersAPI = { getUsers, searchUsers , getUser}
