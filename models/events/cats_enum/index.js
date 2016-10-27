/* models/events/tags/index.js */
'use strict';

const p = Math.pow;

const content = {
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
	"RESERVED":p(2,25)+p(2,26)+p(2,27)+p(2,28)+p(2,29)+p(2,30)
};

const target = {
	"KIDZ":p(2,0),
	"FAMILY":p(2,1),
	"YOUNG_ADULT":p(2,2),
	"ADULT":p(2,3),
	"GAY":p(2,4),
	"XXX":p(2,5),
	"RESERVED":p(2,6)+p(2,7)+p(2,8)+p(2,9)+p(2,10)+p(2,11)+p(2,12)+p(2,13)+p(2,14)+p(2,15)+p(2,16)+p(2,17)+p(2,18)+p(2,19)+p(2,20)+p(2,21)+p(2,22)+p(2,23)+p(2,24)+p(2,25)+p(2,26)+p(2,27)+p(2,28)+p(2,29)+p(2,30)
};

const pricing_enum = {
	"FREE":p(2,0)
};

const datetime = {
	"MONDAY":p(2,0),
	"TUESDAY":p(2,1),
	"WEDNESDAY":p(2,2),
	"THURSDAY":p(2,3),
	"FRIDAY":p(2,4),
	"SATURDAY":p(2,5),
	"SUNDAY":p(2,6),
	"TODAY":p(2,7),
	"TONIGHT":p(2,8),
	"TOMORROW":p(2,9),
	"TOMORROW_NIGHT":p(2,10),
	"THIS_WEEK":p(2,11),
	"NEXT_WEEK":p(2,12)
	"MORNING":p(2,13),
	"AFTERNOON":p(2,14),
	"EVENING":p(2,15),
	"NIGHT":p(2,16),
	"JANUARY":p(2,17),
	"FEBRUARY":p(2,18),
	"MARCH":p(2,19)
	"APRIL":p(2,20),
	"MAY":p(2,21),
	"JUNE":p(2,22),
	"JULY":p(2,23),
	"AUGUST":p(2,24),
	"SEPTEMBER":p(2,25),
	"NOVEMBER":p(2,26),
	"DECEMBER":p(2,27),
	"RESERVED":p(2,28)+p(2,29)+p(2,30)
};

const seasonal = {
	"CHRISTMAS":p(2,0),
	"NEWYEAR":p(2,1),
	"EASTER":p(2,2),
	"SUMMER_SOLSTICE":p(2,3),
	"HALLOWEEN":p(2,4)
};

const social = {
	"POPULAR":(2,0),
	"IM_GOING":(2,1),
	"FRIENDS_GOING":(2,2),
	"MY_BOOKMARKED":(2,3),
	"RESERVED_FOR_FUTURE":reserved
};


**Location Tags** :: [district name] ie. 'barranco'

module.exports = cats_enum;
