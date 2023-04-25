// Kons_7_05.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>
#include <cmath>
using namespace std;

//��������� �� �����
class CupToGo {
    //����-�����  - ������ (private) �� ������������
    string brand; //�����
    int volume;   // o���
    double price; //����
    //�������� ����-�������, ��������� �� �����
    //��������� �� ���� �������� �� �����
public:
    //������������
    CupToGo() //����������� ��� ���������, ����������� �� �����������
    {
        brand = "ASOBU IMPERIAL COFFEE";
        volume = 300;
        price = 49;
    }
    CupToGo(string _brand, int _volume, double _price) {
        brand = _brand;
        volume = _volume;
        price = _price;
    }
    //get() � set()
    string get_brand() { return brand; }
    void set_brand(string nbrand) { brand = nbrand; }
    int get_volume() { return volume; }
    void set_volume(int nvolume) { volume = nvolume; }
    double get_price() { return price; }
    void set_price(double nprice) { price = nprice; }
    //���. ������
    string toString() {
        return "�����:" + brand + ", o���:" + to_string(volume)
            + "��, ����:" + to_string(price) + "��";
    }
    void changePrice(int percent) {
        price = price + percent * price / 100.0;
        //������������ �� 2 ������� �����
        price = floor(price * 100 + 0.5) / 100.0;
    }

};

int main()
{
    system("chcp 1251>nul");
    CupToGo cup1;  //������ ��������� �� �-�� �� ������������
    CupToGo cup2 = CupToGo();//���� ��������� �� �-�� �� ������������
    
    //��������� �� ������ � ������������ � ���������
    CupToGo cup3("KESPER", 400, 10);
    CupToGo cup4 = CupToGo("FRESH N GO", 500, 65);

    //���� �� get() � set()
    cout << "���� �� cup1:" << cup1.get_price() << "��\n";
    cup1.set_brand("Superb Sippy");
    cup1.set_volume(600);
    cup1.set_price(55);

    //���� �� toString()
    cout << cup1.toString() << endl;
    cup1.changePrice(3);
    cout << "���� ���������� �� ������ � 3%\n";
    cout << cup1.toString() << endl;


    //Ma��� �� ������ CupToGo
    CupToGo cups[5]{ cup1, cup2, cup3, cup4, CupToGo("CAFE COMPACT", 380, 52) };
    cout << "����� �� ����\n";
    for (CupToGo cup : cups) {
        cout << cup.toString() << endl;
    }

    //������ � �����
    CupToGo* cup7 = new CupToGo();
    CupToGo* cup8 = new CupToGo("Rose", 400, 23);
    cout << "������ � �����\n";
    cout << cup7->toString() << endl;
    cout << cup8->toString() << endl;

}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
