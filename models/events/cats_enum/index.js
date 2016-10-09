/* models/events/cats_enum/index.js */
'use strict';

const p = Math.pow;
const reserved = p(2,32)+p(2,33)+p(2,34)+p(2,35)+p(2,36)+p(2,37)+p(2,38)+p(2,39)+p(2,40)+p(2,41)+p(2,42)+p(2,43)+p(2,44)+p(2,45)+p(2,46)+p(2,47)+p(2,48)+p(2,49)+p(2,50)+p(2,51)+p(2,52)+p(2,53);

const cats_enum = {
	"ART_EVENT":p(2,0),
	"BOOK_EVENT":p(2,1),
	"MOVIE_EVENT":p(2,2),
	"FUNDRAISER":p(2,3),
	"VOLUNTEERING":p(2,4),
	"FAMILY_EVENT":p(2,5),
	"FESTIVAL_EVENT":p(2,6),
	"NEIGHBORHOOD":p(2,7),
	"RELIGIOUS_EVENT":p(2,8),
	"SHOPPING":p(2,9),
	"COMEDY_EVENT":p(2,10),
	"MUSIC_EVENT":p(2,11),
	"DANCE_EVENT":p(2,12),
	"NIGHTLIFE":p(2,13),
	"THEATER_EVENT":p(2,14),
	"DINING_EVENT":p(2,15),
	"FOOD_TASTING":p(2,16),
	"CONFERENCE_EVENT":p(2,17),
	"MEETUP":p(2,18),
	"CLASS_EVENT":p(2,19),
	"LECTURE":p(2,20),
	"WORKSHOP":p(2,21),
	"FITNESS":p(2,22),
	"SPORTS_EVENT":p(2,23),
	"OTHER":p(2,24),

	"KIDZ":p(2,25),
	"FAMILY":p(2,26),
	"YOUNG_ADULT":p(2,27),
	"ADULT":p(2,28),
	"GAY":p(2,29),
	"XXX":p(2,30),

	"RESERVED_FOR_FUTURE":reserved
}

module.exports = cats_enum;
