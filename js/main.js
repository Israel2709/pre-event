let database = firebase.database()
let eventRef = database.ref("events/ciosummit")
let eventData;
$(document).ready( function(){
    eventRef.once('value').then( snapshot => {
        console.log( snapshot.val())
        eventData = snapshot.val()
        console.log( eventData )
        let{
            about,
            abstract,
            agenta,
            hasSlider,
            heroImg,
            heroImgResponsive,
            name,
            slogan,
            speakers,
            sponsors,
            subtitle,
            title
        } = snapshot.val()
        $("#page-header").css({"background-image":`url(${heroImg})`})
        $("#title").text(title)
        $("#subtitle").text(subtitle)
        $("#slogan").text(slogan)
        $("#abstract").text(abstract)
    })
})