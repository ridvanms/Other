
#include <iostream>
#include <string>
using namespace std;

//Възел на ЛЕС
struct node {
    string name; //данни
    node* next; //указател към следващия елемент
};

//Функция, която извежда списъка
void show(node* first) {
    //указател към текущия елемент
    node* current = first;
    while (current != nullptr) {
        cout << current->name;
        cout << (current->next != nullptr ? "->" : "\n");
        //Преместваме указателя към следващия елемент
        current = current->next;
    }
}
//Функция за вмъкване на елемент в началото
//Параметърът трябва да се подава по референция или чрез указалел
void insertFirst(node*& first, string n) {
    node* nn = new node{ n, first };
    first = nn;
}




int main1()
{
    //Списък от 3 елемента
    node* n1 = new node{ "Ivan", nullptr };
    node* n2 = new node{ "Ana", nullptr };
    node* n3 = new node{ "Petyr", nullptr };

    node* head = n1; //Глава
    n1->next = n2;
    n2->next = n3;

    //node* head1 = 
    //    new node{ "Ivan", new node{"Ana", new node{"Peter", nullptr}} };
    show(head);
    //show(head1);


    //Вмъкване на елемент в началото
    node* nn = new node{ "Dimo", head };
    head = nn;
    show(head);

    insertFirst(head, "Aleksander");
    show(head);

    //Вмъкване в средата 
    // с два спомагателни указателя
    node* node4 = head->next->next->next; //ykazatel към 4-я възел
    node* node5 = node4->next;
    nn = new node{ "Ivo", node5 };
    node4->next = nn;
    show(head);

    //Добавяване в края
    //Получаване на указател към последния елемент
    node* currentLast = head;
    while (currentLast->next != nullptr) currentLast = currentLast->next;
    cout << currentLast->name << endl;
    nn = new node{ "Stela", nullptr };
    currentLast->next = nn;
    show(head);


    return 0;
}

