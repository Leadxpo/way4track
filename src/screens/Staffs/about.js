import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function About() {

    return (
        <View style={styles.wrapper}>
            
            <Text style={[styles.subTitle,{marginTop:50}]}>Customer Support</Text>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="phone" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>9494130830</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="mailbox-outline" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>support@vaarahi.in</Text>
                </View>
            </View>
            <Text style={styles.subTitle}>Follows</Text>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="youtube" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>Gmail</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="twitter" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>Twitter</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="facebook" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>Facebook</Text>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="instagram" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>Instalagram</Text>
                </View>
            </View>
            <Text style={styles.subTitle}>Address</Text>
            <View style={styles.section}>
                <View style={styles.subtitleContent}>
                    <Icon name="google-maps" size={28} color="#700" />
                    <Text style={styles.sectionTitle}>Vaarahi Mart Address{"\n"}
                        <Text style={{
                            fontSize: 16,
                            color: '#333',
                            marginTop:20
                        }} >
                            {"\n"}
                            123 Main Street,{"\n"}
                            Apt 4B,{"\n"}
                            Springfield, IL 62701,{"\n"}
                            USA
                        </Text>
                    </Text>

                </View>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        backgroundColor: '#fff',
        marginBottom: 20,
    },

    section: {
        paddingVertical: 3,
    },
    subtitleContent: {
        flexDirection: 'row',
        paddingVertical: 8,
        marginStart: 30
    },
    sectionTitle: {
        fontSize: 20,
        color: '#333',
        marginStart: 20
    },
    subTitle: {
        color: '#FF7F45',
        fontSize: 18,
        marginStart: 20,
        fontWeight: '700'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    addressText: {
        fontSize: 16,
        marginStart: 20,
        color: '#333',
        lineHeight: 24, // Increases readability for multi-line addresses
    },
    promoBanner: {
        width: '95%',
        height: 150,
        alignSelf: 'center',
        marginVertical: 16,

    },

})