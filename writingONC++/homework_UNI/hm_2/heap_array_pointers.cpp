#include <iostream>
#include <algorithm>
#include <cstdlib> //srand
#include <ctime> //time
using namespace std;

//������� �� ��������� �� �����
//�������� 2 ���������
//������� �� ���������� �� algorithm
void print(int* start, int* end) {
    for (int* p{ start }; p < end; p++) {
        cout << *p << " ";
    }
    cout << endl;
}
//�������� ������� ������� �� ����� �� ���� 6/49, 5/35, 6/42.
int main()
{
    system("chcp 1251>nul");
    //Razmeryt na masiv v heap moze da e promenliva
    // vednyz zadaden, ne se izmenya
    int count;
    cout << "O�� ���� �����?";
    cin >> count; 

    //Syzdavame masiv v heap s razmer count
    int* nums = new int[count] {};
    cout << "������� �����\n";
    print(nums, nums + count);

    cout << "sizeof nums=" << sizeof(nums) << endl;

    //�� �������� � ����� ����������
    //����� �� ������ � ����� �� ��������

    //��������� ������ nums � ������� �� 1 �� count
    for (int i{ 0 }; i < count; i++) {
        nums[i] = i + 1;
    }
    cout << "�������� ������� �����\n";
    print(nums, nums + count);

    //���������� �������
    //������������� �� ���������� �� ����. �����
    srand(time(0));
    random_shuffle(nums, nums + count);
    cout << "��������� �����\n";
    print(nums, nums + count);

    int sel_count; //broi izbrani chisla za igra 5 ili 6 za Bulgaria
    cout << "� ����� ����� �� �������?";
    cin >> sel_count;
   
   //��������� ����� � ����� �� ��������� �����
    int* sel_numbers = new int[sel_count];

    //1 ������� - �������e ������� sel_count ����� o� nums 
    //� ����� ����� 
    for (size_t i = 0; i < sel_count; i++)
    {
        sel_numbers[i] = nums[i];
    }
    cout << "��� 1: ������� �����\n";
    print(sel_numbers, sel_numbers + sel_count);
    cin.get(); cin.get(); //����� �� ��������� �� ������
    system("cls"); //���������� ������
	
    //2 ������� - ����� �� "�������� �����" 
    //����� ��� ����������� ���������� ���� �� ������
    //����������� � ������� - ������� �� ������ � ������  nums,
    //�� �� ������� � ���������� ������������ (�.�. �� � ����� ���� ������)
    
    //��������� �������� -  ��������� ������ nums � �������
    //�� 1 �� count
    for (int i{ 0 }; i < count; i++) {
        nums[i] = i + 1;
    }
    cout << "�������� ������� �����\n";
    print(nums, nums + count);

    int k{ 0 }; //k- ������ �� ��������� ����� � ������  sel_numbers
                //��������� �� ����
     
    //����� �� ���� �� �������, � ����� �� ������
    for (size_t i = 0; i < sel_count; i++)
    {
        //��� ����� �������� ����������� ���������� 
        //���������� ���� �� ������, ��� ���� "�����������" �����
        //�.�. ���� ������� ����� �� ������ �������� nums+i
        random_shuffle(nums+i, nums + count);
        cout << "���� " << i + 1 << " �����������\n";
        print(nums, nums+count);
        
       //���� ������� �����������  �� ������ ("���������") ������� 
      // ����� � �� 1-�� ������� ( � ������ 0)
        sel_numbers[k] = nums[k]; 
        //���� ������� ����������� "���������" �������
        // �����  � �� 2-�� ������� ( � ������ 1)  � �.�.
        k++; //������ ��  ��������, ����� �� "������" ���� ���������� �����������
    }
     cout << "��� 2:  ������� �����\n";
     print(sel_numbers, sel_numbers + sel_count);
     //���������� ������� �� ���������� � ������������� ������� sort
     sort(sel_numbers, sel_numbers + sel_count);
     cout << "��������� �� ����������\n";
     print(sel_numbers, sel_numbers + sel_count);

	 delete[] nums; //������������� ������� � �����, ������� �� nums
	 delete[] sel_numbers;//������������� ������� � �����, ������� �� sel_numbers
	 nums=nullptr; //"��������" �����������
     sel_numbers=nullptr;
    return 0;
}