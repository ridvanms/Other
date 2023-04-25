
#include <iostream>
#include <string>
using namespace std;

//����� �� ���
struct node {
    string name; //�����
    node* next; //�������� ��� ��������� �������
};

//�������, ����� ������� �������
void show(node* first) {
    //�������� ��� ������� �������
    node* current = first;
    while (current != nullptr) {
        cout << current->name;
        cout << (current->next != nullptr ? "->" : "\n");
        //����������� ��������� ��� ��������� �������
        current = current->next;
    }
}
//������� �� �������� �� ������� � ��������
//����������� ������ �� �� ������ �� ���������� ��� ���� ��������
void insertFirst(node*& first, string n) {
    node* nn = new node{ n, first };
    first = nn;
}




int main1()
{
    //������ �� 3 ��������
    node* n1 = new node{ "Ivan", nullptr };
    node* n2 = new node{ "Ana", nullptr };
    node* n3 = new node{ "Petyr", nullptr };

    node* head = n1; //�����
    n1->next = n2;
    n2->next = n3;

    //node* head1 = 
    //    new node{ "Ivan", new node{"Ana", new node{"Peter", nullptr}} };
    show(head);
    //show(head1);


    //�������� �� ������� � ��������
    node* nn = new node{ "Dimo", head };
    head = nn;
    show(head);

    insertFirst(head, "Aleksander");
    show(head);

    //�������� � ������� 
    // � ��� ������������ ���������
    node* node4 = head->next->next->next; //ykazatel ��� 4-� �����
    node* node5 = node4->next;
    nn = new node{ "Ivo", node5 };
    node4->next = nn;
    show(head);

    //���������� � ����
    //���������� �� �������� ��� ��������� �������
    node* currentLast = head;
    while (currentLast->next != nullptr) currentLast = currentLast->next;
    cout << currentLast->name << endl;
    nn = new node{ "Stela", nullptr };
    currentLast->next = nn;
    show(head);


    return 0;
}

