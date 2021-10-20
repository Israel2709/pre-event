let database = firebase.database()
let eventRef = database.ref("events/ciosummit")
let speakersRef = database.ref("speakers")
let sponsorsRef = database.ref("sponsors")
let eventData;
let speakersList;
let sponsorsList;

const getSpeakers = async () => {
    let result = await fetch("https://idc-latam-default-rtdb.firebaseio.com/speakers/.json")
    return await result.json()
}

const getSponsors = async () => {
    let result = await fetch("https://idc-latam-default-rtdb.firebaseio.com/sponsors/.json")
    return await result.json()
}

const showSpeakerModal = data => {
    console.log(data)
    console.log(speakersList)
    console.log(speakersList[data])
    let { name, picture, bio } = speakersList[data]
    $("#speaker-modal #title").text(name)
    $("#speaker-modal #bio").text(bio.es)
    $("#speaker-modal #picture").attr("src", picture)
    $("#speaker-modal").modal("show")
}
$(document).ready(function () {
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
        speakersList = await getSpeakers()
        sponsorsList = await getSponsors()
        console.log(speakersList)
        console.log(sponsorsList)
        $("#title").text(title)
        $("#subtitle").text(subtitle)
        $("#slogan").text(slogan)
        $("#abstract").text(abstract)
        $("#agenda").text(agenda.title)
        $("#agenda-description").text(agenda.description)
        speakers.forEach((speakerSection, index) => {
            $("#speakers-wrapper").append(`
                <div class="col-12">
                    <h3 class="text-dark text-gradient w-fit-content">${speakerSection.section}</h3>
                </div>
                <div class="col-12">
                <div id="speakers-${index}" class="row"></div>
                </div>
                
            `)
            let sectionContent = speakerSection.speaker.reduce((accum, current, index) => {
                console.log(speakersList[current])
                let speakerData = speakersList[current]
                let { avatar, bio, business, job, name, picture } = speakerData
                return accum + `
                <div class="col-12 col-lg-2 col-md-4 mx-md-auto mb-4">
                    <div class="card card-profile mt-md-0 mt-5 speaker-card h-100">
                        <a href="javascript:;">
                            <div class="p-3">
                                <img class="w-100 border-radius-md" src=${picture}>
                            </div>
                        </a>
                        <div class="cAard-body blur justify-content-center text-center mt-n5 mx-4 border-radius-md d-flex flex-column h-100">
                            <h4 class="mb-0">${name}</h4>
                            <p class="mb-0 speaker-role"><b>${job}</b></p>
                            <p class="mb-2">${business}</p>
                            <button type="button" class="btn bg-gradient-info" style="margin-top:auto; width:100%" onclick="showSpeakerModal('${current}')">Bio</button>
                        </div>
                    </div>
                </div>`
            }, "")
            $(`#speakers-${index}`).append(sectionContent)
        })
        sponsors.forEach((sponsor, index) => {
            console.log(sponsor)
            console.log(sponsorsList[sponsor.name])
            let { ico, name, links, boilerplate } = sponsorsList[sponsor.name]
            $("#sponsors-wrapper").append(`
            <div class="col-md-3 mb-md-0 mb-7">
                <div class="card sponsor-card">
                    <div class="text-center mt-n5 z-index-1">
                        <div class="position-relative">
                            <div class="blur-shadow-avatar">
                                <img class="avatar avatar-xxl shadow-lg" src=${ico}>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-center pb-0">
                        <h4 class="mb-0">${name}</h4>
                        <p><a href="${links.web}" target="_blank">${links.web}</a> </p>
                        <p class="mt-2 abstract">${boilerplate}
                        </p>
                    </div>
                </div>
            </div>
            `)
        })
    })
})

/*
const sponsorcard = ""*/