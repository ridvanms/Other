#include <iostream>
#include <algorithm>
#include <cstdlib>
#include <ctime>

using namespace std;

//void const_with_pointers() {
//    // konstanten ukazatel
//
//    int* const p1 = new int{ 12 };
//    cout << p1 << "<p1 - *p1> " << *p1 << endl;
//    *p1 = *p1 + 100;
//    cout << p1 << "<p1 - *p1>" << *p1 << endl;
//
//    //ukazatel kum konstanta
//
//    const int* p2;
//    p2 = p1;
//    cout << p2 << " < > " << *p2 << endl;//adres 112
//
//    p2 = new int{ 777 };
//    cout << p2 << " < > " << *p2 << endl;//nov adres 777
//
//    //Konstanten ukazatel kum konstanta
//    const int* const p3 = new int{ 25 };
//
//    double x{ 1.5 };
//    const double* px{ &x }; //Ukazatel kum konstanta
//    cout << x << " <x - *px> " <<*px<< endl;
//}

//void stack_array_pointers() {
//    //Imeto na masiva v povecheto operatori
//    // predstavlqva Konstanten ukazatel kum nachaloto mu
//
//    /*
//        Po standart razmerite na masiva se zadavat 
//        s konstanten izraz
//    */
//
//    const int SIZE{ 4 };
//    int arr[SIZE]{ 1,2,3,4 };
//
//    cout << "nachalen adres na masiva." << arr << " <arr &arr[0]> " << &arr[0] << endl;
//
//    //Ukazatel sochesht 3 element
//    cout << "Ukazatel sochesht 3 element" << endl;
//    int* p3 = arr + 2;
//    cout << *p3 << " <*p3 p3[0]> " << p3[0] << endl; //3 
//    cout << *(p3 - 1) << " <*(p3 - 1) p3[-1]> " << p3[-1] << endl; // 2
//    cout << *(p3 + 1) << " <*(p3 + 1) p3[1]> " << p3[1] << endl; // 4
//
//    //Cikul za obhojdane na masiv v steka
//    //1.Cikul po indeks -0 do SIZE-1;
//    cout << "Cikul za obhojdane na masiv v steka" << endl;
//    cout << "Index loop\n";
//    for (int i{ 0 }; i < SIZE; i++) {
//        cout << arr[i] << " " << *(arr + i) << endl;
//    }
//    cout << endl;
//
//    //2 Cikul po ukazatel
//    // Ukazatelqt izmenqme ot arr do arr+SIZE-1
//    // arr++; //ne ⚠️
//
//    cout << " Cikul po ukazatel" << endl;
//
//    cout << "pointer loop\n";
//    for (int* p{ arr }; p < arr + SIZE; p++) {
//        cout << *p << " ";
//    }
//    cout <<"\n"<< endl;
//
//    //3 Cikul for za diapazon
//    //range based for, enhanced for 
//
//    //V funkciqta v koqto e definiran stekov masiv
//    //toi znae razmera si
//
//    cout << "Cikul for za diapazon" << endl;
//    
//    cout << "range based for\n";
//    for (int element : arr) {
//        cout << element << " ";
//    }
//    cout << '\n' << endl;
//
//    /*
//        V operaciqta sizeof se vzema pulniq razmer na stekoviq masiv
//    */
//    cout << arr << endl; //Ukazatel
//    cout << sizeof(arr) << "B\n"; // Structura masiv
//
//    //Razlika na 2 ukazatelq - broi elementi m\y tqh
//    cout << "p3 - arr = " << p3 - arr << endl;
//
//}


/*
        Functicq za izvejdane na masiv
      izpolzva 2 ukazatelq
      podobno ot functicqta algorithm
    */
//void print(int* start, int* end) {
//    for (int* p{ start }; p < end; p++) {
//        cout << *p << " ";
//    }
//    cout << "\n" << endl;
//}
//void heap_array_pointers() {
//    
//
//    //Zadachata imitira teglene na chisla za toto 6/49,5/35
//
//    system("chcp 1251>nul");
//    //Razmerut na masiv v heap moze da e promenliva 
//    //Vednuj zadaden ne se izmenq 
//    int count;
//    cout << "Obsht broi chisla?";
//    cin >> count; //example 49
//    //Suzdavame masiv v heap s razmer count
//    int* nums = new int[count] {};
//    cout << "Izhoden masiv\n";
//    print(nums, nums + count);
//
//    cout << "sizeof nums= " << sizeof(nums) << endl;
//
//    /*
//        Za masivite v heapa polzvame 
//       cikup po index i cikul po ukazatel
//    */
//    
//    //Zapulvame masiva nums s chislata ot 1 do count
//    for (int i{ 0 }; i < count; i++) {
//        nums[i] = i + 1;
//    }
//    cout << "Zapulnen izhoden masiv\n";
//    print(nums, nums + count);
//
//    //razburkvame chislata 
//    //inicializaciq na generatora na sluch chisla
//    srand(time(0));
//    random_shuffle(nums, nums + count);
//    cout << "razburkan masiv\n";
//    print(nums, nums + count);
//
//    int sel_count; //broi izbrani chisla za igra 5 ili 6 za Bulgariq
//    cout << "S kolko chisla shte igraete?: ";
//    cin >> sel_count;
//
//    //Suzdavame masiv v heapa za izbranite chisla
//    int* sel_numbers = new int[sel_count];
//
//    //1 variant - kopirane purvite sel_count chisla ot nums
//    //V noviq masiv
//    for (size_t i = 0; i < sel_count; i++) {
//        sel_numbers[i] = nums[i];
//    }
//    cout << "Var 1 : izbrani chisla\n ";
//    print(sel_numbers, sel_numbers + sel_count);
//    cin.get();
//    cin.get();//pausa do natiskane na simvol
//    system("cls");//izchistvame ekrana
//
//    /*
//        2 Variant prid da 'izteglim chislo'
//      vseki put razburkvame ostanalata chast ot masiva nums,
//      no ne uchastva v sledvashite razburkvaniq(t.e ne e tochnokato najivo)
//
//    */
//    //Zapochvame otnachalo - zapulvame masiva nums s chislata 
//    // ot 1 do count
//    for (int i{ 0 }; i < count; i++) {
//        nums[i] = i + 1;
//    }
//    cout << "Zapulnen izhoden masiv\n";
//    print(nums, nums + count);
//    int k{ 0 }; //k - index na porednoto chislo va masiva  sel_numbers , zapochvame ot nula
//    
//    //cikul po broq nachislata s koito shte igraem
//    for (size_t i = 0; i < sel_count; i++) {
//        /*
//            Pri vsqkosledvasho razburkvane izpolzvame
//            OSTANALATA  chast ot masiva bez veche 'izteglenite' chisla
//            t.e kato nachalen adres na masiva zadavame nums + i
//        */
//        random_shuffle(nums + i, nums + count);
//        cout << "Sled " << i + 1 << " razburkvane\n";
//        print(nums, nums + count);
//
//        //sled purvoto rzburkvane shte vzemem ("izteglqme") chisloto
//        //koeto e na 1-va poziciq (s index 0)
//        sel_numbers[k] = nums[k];
//        //Sled vtoroto razburkvane "izteglqme"chisloto
//        //koeto e na 2-ra poziciq (s index 1)i t.n
//        k++; //index na elementa, koito shte teglim sled sledvashtoto razburkvane 
//    }
//    cout << "Var 2: izbrani chisla\n";
//    print(sel_numbers, sel_numbers + sel_count);
//    //podrejdamechislata po narastvane s bibliotechna funkciq sort
//    sort(sel_numbers, sel_count + sel_numbers);
//    cout << "Sortirani po narastvane\n";
//    print(sel_numbers, sel_numbers + sel_count);
//
//    delete[] nums; // osvobojdavame pametta v heapa zaemana ot nums
//    delete[] sel_numbers;
//    nums = nullptr;//nulirame ukazatelite
//    sel_numbers = nullptr;
//    
//};
int main() {
    //heap_array_pointers();

    //const_with_pointers();

    //stack_array_pointers()
    
    
    ;
    return 0;
}

