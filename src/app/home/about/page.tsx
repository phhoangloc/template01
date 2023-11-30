'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import SingleLeft from '@/component/element/singleLeft'
import SingleRight from '@/component/element/singleRight'
import Loading from '@/component/item/loading'
const About = () => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)


    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    }, [])

    const reCom =
        <div className='single'>
            <div className={`item xs12 sm6 md4 left center ${currentTheme ? "white" : "black"}`}>
                <SingleLeft img={'/img/coffee.jpg'} />
            </div>
            <div className={`item xs12 sm6 md8 right `}>
                <div className="page center">
                    <h3> Ngôi nhà của niềm đam mê sách.</h3>
                </div>
                <div className="page center">

                    <h4>Thư viện trực tuyến của chúng tôi là một nơi tuyệt vời dành cho những ai đam mê sách. <br></br>
                        Bạn có thể truy cập và đọc hàng ngàn tác phẩm từ các thể loại khác nhau, từ tiểu thuyết lãng mạn đến khoa học viễn tưởng hấp dẫn. <br></br>
                        Với một kho tàng vô tận của tri thức, bạn sẽ luôn tìm thấy điều gì đó để thỏa mãn sự tò mò và yêu sách của mình.
                    </h4>
                </div>
                <div className="page center">
                    <h3>Không gian ấm áp cho sự gặp gỡ và trao đổi.</h3>
                </div>
                <div className="page center">
                    <h4>Thư viện của chúng tôi không chỉ là một nơi để đọc sách. <br></br>
                        Đó còn là một môi trường thân thiện và ấm cúng, nơi bạn có thể gặp gỡ những người có cùng sở thích và trao đổi về những cuốn sách yêu thích. <br></br>
                        Hãy tham gia vào các cuộc thảo luận, chia sẻ cảm nhận về những tác phẩm bạn đã đọc và khám phá thế giới của văn học thông qua góc nhìn đa dạng của cộng đồng.
                    </h4>
                </div>
                <div className="page center">
                    <h3>Nơi tìm về yên bình trong cuộc sống.</h3>
                </div>
                <div className="page center">
                    <h4>Trong cuộc sống hối hả, đôi khi chúng ta cần một chỗ dừng chân để tận hưởng phút giây yên bình.
                        Thư viện của chúng tôi là nơi bạn có thể tìm đến, ngồi xuống với một cuốn sách tuyệt vời và lặng lẽ thưởng thức hương vị của cuộc sống.
                        Hãy để thư viện trực tuyến miễn phí của chúng tôi trở thành một người bạn đồng hành đáng tin cậy trong hành trình khám phá văn hóa và tri thức.<br></br>
                        <br></br>
                        Hãy tham gia cùng chúng tôi và trải nghiệm niềm vui đọc sách, gặp gỡ bạn bè và tìm thấy khoảnh khắc bình yên.
                        Thư viện trực tuyến miễn phí của chúng tôi sẽ luôn sẵn sàng chào đón bạn.<br></br>
                        <br></br>
                        Chúng tôi trân trọng sự yêu thích của bạn đối với sách và mong rằng thư viện này sẽ là một phần quan trọng của cuộc sống văn hóa của bạn.</h4>
                </div>
                <div className="page center">
                    <h4>Cảm ơn bạn đã tham gia cùng chúng tôi!</h4>
                    <h5><span>Trân trọng,</span><br></br>
                        Lockheart</h5>
                </div>
            </div>
        </div>

    return reCom
}
export default About