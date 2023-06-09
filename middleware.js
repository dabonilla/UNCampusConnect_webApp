'use client'
import { NextResponse } from 'next/server';
// This function can be marked `async` if using `await` inside
const endpoint = `http://${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}/graphql`

export async function Middleware(request) {
  
  const queryRole = `
  query{
    getMyInfo {
      role
    },
  }
  `
  const pathName= request.nextUrl.pathname
  const token = request.cookies.get('myToken')
  if ( token == undefined){
    return NextResponse.redirect(new URL('/UN-CampusConnect/signin', request.url))
  }
  else{
    /*
    let role = ''
      await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json","Authorization": `Bearer ${token.value}` },
                  body: JSON.stringify({ query: queryRole })
                }).then((response) => {
                    if (response.status >= 400) {
                      throw new Error("Error fetching data");
                    } else {
                      return response.json();
                    }
                  })
                  .then((data) =>{
                    role = data.data.getMyInfo.role
                })
                
  if (role != ''){
    if(pathName.startsWith('/UN-CampusConnect/admin') && role != 'admin'){
      return NextResponse.redirect(new URL('/UN-CampusConnect/403', request.url))
    }
    else if(pathName.startsWith('/UN-CampusConnect/student') && role != 'student'){
      return NextResponse.redirect(new URL('/UN-CampusConnect/403', request.url))
    }
    else if(pathName.startsWith('/UN-CampusConnect/tutor') && role != 'tutor'){
      return NextResponse.redirect(new URL('/UN-CampusConnect/403', request.url))
    }else if (pathName.startsWith('/UN-CampusConnect/bienestarpublications/create')) {
      return NextResponse.next();
    }
  }
*/
}
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/UN-CampusConnect/student','/UN-CampusConnect/admin/calls','/UN-CampusConnect/student/calls']
};

export default Middleware;