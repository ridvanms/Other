#include <iostream>
using namespace std;

//const int MONDAY = 1;
//const int TUESDAY = 2;
//const int WEDNESDAY = 3;

enum days {MONDAY=1, TUESDAY, WEDNESDAY}; //int

enum days1:short { MONDAY1=1, TUESDAY1, WEDNESDAY1 };

enum colors {RED, GREEN, BLUE};  //0, 1, 2
enum pizza {SMALL=5, MID=8, BIG=12};

//от С++11- изброявания с обхват
enum class eye_color {BLUE, BLACK, BROWN, GREEN};
enum class hair_color {BLACK,BROWN, RED, BLOND };

int main() {

	// обикновени изброявания
	days d1;
	d1 = MONDAY;

	days d2{ TUESDAY };
	
	//cin >> d1; //NE!!
	cout << d1 << " " << d2 << endl; //1 2
	cout << sizeof d1 << " " << sizeof d2 << endl; //4 4 

	//Може да се използва като ключ на switch
	pizza his{ BIG };
	his = MID;
	switch (his) {
	case SMALL: cout << "malka, cena " << SMALL << "lv\n"; break;
	case MID: cout << "sredna, cena " << MID << "lv\n"; break;
	case BIG: cout << "golyama, cena " << BIG << "lv\n"; break;
	}
	//Изброяване с обхват (scoped enums)
		eye_color her{ eye_color::BLACK };
		hair_color him{ hair_color::BLACK };

		//cout << her;
		//За извеждане - преобразуване към int
		cout << static_cast<int>(her) << " " << static_cast<int>(him) << endl;




}