import React, { useEffect, useState } from 'react'
import './RowPost.css'
import {imageUrl} from '../../constants/constants'
import axios from '../../axios'
import YouTube from 'react-youtube'
import { API_KEY } from '../../constants/constants'
function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=> {
    axios.get(props.url).then(response=>{
      console.log(console.data)
      setmovies(response.data.results)
    })// .catch(err=>{
//      alert('Network error')
//   })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
        console.log(id)
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US&api_key=75bff9690eb03bda4efcdf3d1063fd44`).then(response=>{
          if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
          }else{
            console.log('Array empty')
          }
        })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='row_posters'>
        {movies.map((obj)=>
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src = {`${imageUrl+obj.backdrop_path}`} />
        )}
          
      
      </div>
    { urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

export default RowPost
