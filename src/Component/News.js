import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner'
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
    const [articles,setArticles]= useState([]);
    // const [loading,setLoading]= useState([true]);
    const [page,setPage]= useState(1);
    const [totalResults,setTotalResults]= useState(0);
    const CapitalizeFirstLettertoUpper = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // static PropTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }
    // constructor(props) {
    //     super(props);
    // }
    const updateNews= async ()=>{
        props.setProgress(10);  //initial progress
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${props.page}&pageSize=${props.pageSize}`;   // 20 news will display on the single page
        let data = await fetch(url);
        props.setProgress(30);  //after fetching data progress is given
        let parsedData = await data.json()
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    // props.setProgress(10);
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    //     setLoading(true)
    //     let data = await fetch(url);
    //     props.setProgress(30);
    //     let parsedData = await data.json()
    //     props.setProgress(70);
    //     setArticles(parsedData.articles)
    //     setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);

    // }
//work of componentdidmount is done by the useEffect function
    useEffect(()=>{
        document.title = `${CapitalizeFirstLettertoUpper(props.category)}-NewsApp`;
        updateNews();
        // eslint-disable-next-line
    },[])   
    // const handlePrevClick = async () => {
    //     // this.setState({ page: this.state.page - 1 });
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     // this.setState({ page: this.state.page + 1 })
    //     setPage(page+1);
    //     updateNews();
    // }
    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 });
        // this.updateNews();
        //data to be copied from the updateNews() function
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;   // 20 news will display on the single page
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        //this.setState({ articles: articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
    }
        return (
            <>
                <h1 className="text-center" style={{ margin: "40px 0px", color: "rgb(227, 13, 152)", fontWeight: "bolder", textDecoration: "underline", textDecorationColor: "cyan",marginTop: "90px" }} >NewsApp - Top {CapitalizeFirstLettertoUpper(props.category)} Headlines</h1>
                {/* <Spinner/> */}
                {/* {this.state.Loading && <spinner/>}  if loading is true then show the spinner otherwise */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    // loader={<h4></h4>}
                >
                    <div className='container'>
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


            </>
        )
}
                        
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};
export default News




