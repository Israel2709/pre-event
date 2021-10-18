let database = firebase.database()
let eventRef = database.ref("events/ciosummit")
let speakersRef = database.ref("speakers")
let sponsorsRef = database.ref("sponsors")
let eventData;

const getSpeakers = async () => {
    let result = await fetch("https://idc-latam-default-rtdb.firebaseio.com/speakers/.json")
    return await result.json()
}

const showSpeakerModal = data => {
    console.log( data )
}
$(document).ready( function() {
    eventRef.once('value').then(async snapshot => {
        console.log(snapshot.val())
        eventData = snapshot.val()
        console.log(eventData)
        let {
            about,
            abstract,
            agenda,
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
        let speakersList = await getSpeakers()
        console.log( speakersList )
        $("#page-header").css({ "background-image": `url(${heroImg})` })
        $("#title").text(title)
        $("#subtitle").text(subtitle)
        $("#slogan").text(slogan)
        $("#abstract").text(abstract)
        $("#agenda").text(agenda.title)
        $("#agenda-description").text(agenda.description)
        speakers.forEach( (speakerSection, index) => {
            $("#speakers-wrapper").append(`
                <div className="col-12">
                    <h3 class="text-dark text-gradient w-fit-content">${speakerSection.section}</h3>
                </div>
                <div id="speakers-${index}" class="row"></div>
            `)
            let sectionContent = speakerSection.speaker.reduce((accum, current) => {
                console.log( speakersList[current] )
                let speakerData = speakersList[current]
                let { avatar, bio, business, jog, name, picture } = speakerData
                return accum + `
                <div class="col-lg-3 col-md-6 mx-md-auto mb-4">
                    <div class="card card-profile mt-md-0 mt-5">
                        <a href="javascript:;">
                            <div class="p-3">
                                <img class="w-100 border-radius-md" src=${picture}>
                            </div>
                        </a>
                        <div class="cAard-body blur justify-content-center text-center mt-n5 mx-4 mb-4 border-radius-md">
                            <h4 class="mb-0">${name}</h4>
                            <p>${business}</p>
                            <button type="button" class="btn bg-gradient-info" onclick="showSpeakerModal(${speakerData})">Info</button>
                        </div>
                    </div>
                </div>`
            },"")
            $(`#speakers-${index}`).append(sectionContent)
        })
    })
})